import { createSlice } from '@reduxjs/toolkit';
import { IChatroom, IRoom } from 'src/types/room';
import { getChatsByIDroomThunk, getRoomsThunk } from './room_action';
import { IUser } from 'src/types/user';

const initialState: {
  rooms: IRoom[];
  chats: IChatroom;
  isOpenMenu: boolean;
  newUserChat: IUser;
} = {
  rooms: [],
  chats: {},
  isOpenMenu: false,
  newUserChat: {}
};
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const { id_room, chat, date } = action.payload;
      if (date && chat && id_room) {
        const chatDates = state.chats[id_room];
        if (chatDates) {
          const index = chatDates.findIndex((dateItem: any) => Object.keys(dateItem)[0] === date);
          if (index > -1) {
            chatDates[index][date].push(chat);
          } else {
            chatDates.push({ [date]: [chat] });
          }
        } else {
          state.chats[id_room] = [{ [date]: [chat] }];
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
    resetRoom: (state) => {
      state.rooms = initialState.rooms;
      state.chats = initialState.chats;
      state.isOpenMenu = false;
    },
    setNewUserChat: (state, option) => {
      const { user } = option.payload;
      console.log(user);
      state.newUserChat = user;
    },
    deleteNewUserChat: (state) => {
      state.newUserChat = {};
    },
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
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
            state.chats[restroom.id_room] = chats;
          }
        }
      });
    });
    builder.addCase(getChatsByIDroomThunk.fulfilled, (state, action) => {
      const { id_room, chats } = action.payload;
      if (chats && chats[0]) {
        state.chats[id_room] = chats;
      }
    });
  }
});

const { reducer, actions } = roomSlice;
export const { createChat, createFirstChat, resetRoom, toggleMenu, setNewUserChat, deleteNewUserChat } = actions;
export default reducer;