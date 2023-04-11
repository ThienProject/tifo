import { createSlice } from '@reduxjs/toolkit';
import { IChatGroup, IGroup } from 'src/types/group';
import { getChatsByIDGroupThunk, getGroupsThunk } from './group_action';

const initialState: {
  groups: IGroup[],
  chats: IChatGroup,
} = {
  groups: [],
  chats: {}
}
const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const { id_group, chat, date } = action.payload;
      const chatDates = state.chats[id_group];
      if (chatDates) {
        const index = chatDates.findIndex((dateItem: any) => Object.keys(dateItem)[0] === date);
        if (index > -1) {
          chatDates[index][date].push(chat)
        } else {
          chatDates.push({ [date]: [chat] })
        }
      } else {
        state.chats[id_group] = [{ [date]: [chat] }]
      }

      // // const index = state.findIndex((group) => group.id_group == id_group);
      // const group = state.chats[id_group];
      // if (group.chats) {
      //   const chatState = group.chats[length - 1];
      //   chatState[Object.keys(chatState)[0]].push(chat);
      // } else {
      //   group.chats = [{ [date]: [chat] }];
      // }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupsThunk.fulfilled, (state, action) => {
      const { groups } = action.payload;
      groups.forEach((group: any) => {
        const { chats, ...restGroup } = group;
        state.groups.push(restGroup);
        if (restGroup.id_group && chats) {
          state.chats[restGroup.id_group] = chats;
        }
      })
    });
    builder.addCase(getChatsByIDGroupThunk.fulfilled, (state, action) => {
      const { id_group, chats } = action.payload;
      state.chats[id_group] = chats;
    });
    // builder.addCase(createChatThunk.fulfilled, (state, action) => {
    //   const { chat } = action.payload;
    //   state.posts.push(post);
    // });
  }
});

const { reducer, actions } = groupSlice;
export const { createChat } = actions;
export default reducer;
