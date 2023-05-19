import { createSlice } from '@reduxjs/toolkit';
import { IChatDates, IChatroom, IRoom } from 'src/types/room';
import {
  clearChatsThunk,
  deleteRoomThunk,
  deleteUserThunk,
  getChatsByIDroomThunk,
  getRoomsThunk,
  getUsersByIDRoomThunk
} from './room_action';

const initialState: {
  rooms: IRoom[];
  chats: IChatroom;
  isOpenMenu: boolean;
  currentRoom: IRoom;
} = {
  rooms: [],
  chats: {},
  isOpenMenu: false,
  currentRoom: {}
};
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const { id_room, chat, date } = action.payload;
      if (date && chat && id_room) {
        const chatDates: IChatDates[] = state.chats[id_room];
        if (chatDates) {
          const index = chatDates.findIndex((dateItem) => Object.keys(dateItem)[0] === date);
          if (index > -1) {
            chatDates[index][date].push(chat);
          } else {
            chatDates.push({ [date]: [chat] });
          }
        } else {
          state.chats[id_room] = [{ [date]: [chat] }];
        }
        // move item room to top
        const index = state.rooms.findIndex((item) => item.id_room === id_room);
        if (index > -1) {
          const room = state.rooms.splice(index, 1)[0];
          state.rooms.unshift(room);
        }
      }
    },
    createFirstChat: (state, action) => {
      const { chat, user, date, id_room, avatar, type, name } = action.payload;
      if (date && chat && id_room) {
        state.chats[id_room] = [{ [date]: [chat] }];
        state.rooms.unshift({ id_room, name, avatar, type, users: [user] });
      }
    },
    createRoom: (state, action) => {
      const { name, id_room, chat, avatar, date, users, type } = action.payload;
      if (date && chat && id_room) {
        state.chats[id_room] = [{ [date]: [chat] }];
        state.rooms.unshift({ id_room, name, avatar, type, users: users });
      }
    },
    resetRoom: (state) => {
      state.rooms = initialState.rooms;
      state.chats = initialState.chats;
      state.isOpenMenu = false;
    },
    clearCurrentChat: (state) => {
      state.currentRoom = {};
    },
    setCurrentRoom: (state, option) => {
      const { type, users } = option.payload;
      state.currentRoom = { type, users };
    },
    setStatusRoom: (state, action) => {
      const { id_room, status, id_user } = action.payload;
      const index = state.rooms.findIndex((item) => item.id_room === id_room);

      if (index > -1) {
        const users = state.rooms[index].users;
        if (users) {
          const user = users[0];
          if (user && user.id_user === id_user) user.status = status;
        }
      }
    },
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    addMembers: (state, action) => {
      const { room, chats, limit, users } = action.payload;
      const indexRoom = state.rooms.findIndex((r) => r.id_room === room?.id_room);
      if (indexRoom == -1) {
        state.rooms.unshift({ ...room, users });
        state.chats[room?.id_room] = chats;
      } else {
        const users = state.rooms[indexRoom].users;
        if (users) {
          users.push(...users);
          const lastDate = Object.keys(state.chats[room?.id_room][0])[0];
          if (lastDate === Object.keys(chats[0])[0]) {
            const chatDate = state.chats[room.id_room][0];
            chatDate[lastDate].push(...chats[0][lastDate]);
          } else {
            state.chats[room?.id_room].push(...chats);
          }
        }
      }
    },
    deleteMember: (state, action) => {
      const { id_me, id_user, id_room, chat, date } = action.payload;
      const indexRoom = state.rooms.findIndex((r) => r.id_room === id_room);
      if (id_me === id_user) {
        state.rooms = state.rooms.filter((item) => item.id_room != id_room);
        delete state.chats[id_room];
      } else {
        const users = state.rooms[indexRoom].users;
        if (users) {
          state.rooms[indexRoom].users = users.filter((item) => item.id_user != id_user);
          const chatDates = state.chats[id_room];
          if (chatDates) {
            const index = chatDates.findIndex((dateItem) => Object.keys(dateItem)[0] === date);
            if (index > -1) {
              chatDates[index][date].push(chat);
            } else {
              chatDates.push({ [date]: [chat] });
            }
          } else {
            state.chats[id_room] = [{ [date]: [chat] }];
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomsThunk.fulfilled, (state, action) => {
      const { rooms } = action.payload;
      rooms.forEach((room: any) => {
        const { chats, ...restroom } = room;
        state.rooms.push(restroom);
        if (chats && chats[0]) {
          if (restroom.id_room) {
            if (!state.chats[restroom.id_room]) {
              state.chats[restroom.id_room] = chats;
            }
          }
        }
      });
    });
    builder.addCase(getUsersByIDRoomThunk.fulfilled, (state, action) => {
      const { id_room, users } = action.payload;
      const index = state.rooms.findIndex((item) => item.id_room === id_room);
      if (index != -1) {
        state.rooms[index].users = users;
      }
    });
    builder.addCase(getChatsByIDroomThunk.fulfilled, (state, action) => {
      const { id_room, chats, room } = action.payload;
      if (chats && chats[0]) {
        state.chats[id_room] = chats;
      }
      state.currentRoom = room;
    });
    builder.addCase(clearChatsThunk.fulfilled, (state, action) => {
      const { id_room } = action.payload;
      if (id_room) {
        state.chats[id_room] = [];
      }
    });
    builder.addCase(deleteRoomThunk.fulfilled, (state, action) => {
      const { id_room } = action.payload;
      if (id_room) {
        state.chats[id_room] = [];
        state.rooms = state.rooms.filter((item) => item.id_room !== id_room);
      }
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      const { id_room, id_owner } = action.payload;
      if (id_room && !id_owner) {
        delete state.chats[id_room];
        state.rooms = state.rooms.filter((item) => item.id_room !== id_room);
      }
    });
  }
});

const { reducer, actions } = roomSlice;
export const {
  createChat,
  createRoom,
  setStatusRoom,
  createFirstChat,
  resetRoom,
  toggleMenu,
  setCurrentRoom,
  addMembers,
  deleteMember,
  clearCurrentChat
} = actions;
export default reducer;
