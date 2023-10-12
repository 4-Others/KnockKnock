import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardItem} from '../dataConvert';

const initialState: BoardItem[] = [];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // setBoardReducer: (state, action: PayloadAction<BoardItem[]>) => {
    //   return action.payload;
    // },
    setBoardReducer: (state, action: PayloadAction<any>) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else if (action.payload.body && action.payload.body.data) {
        const updatedItem = action.payload.body.data;
        const index = state.findIndex(item => item.tagId === updatedItem.tagId);
        if (index !== -1) {
          state[index] = updatedItem;
        } else {
          state.push(updatedItem);
        }
      }
    },
    postBoardReducer: (state, action: PayloadAction<BoardItem>) => {
      const newItem: BoardItem = {
        ...action.payload,
      };
      state.push(newItem);
    },
  },
});

export const {setBoardReducer, postBoardReducer} = boardSlice.actions;
export default boardSlice.reducer;
