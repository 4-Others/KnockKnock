import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardItem} from '../dataConvert';

const initialState: BoardItem[] = [];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardData: (state, action: PayloadAction<BoardItem[]>) => {
      return action.payload;
    },
  },
});

export const {setBoardData} = boardSlice.actions;
export default boardSlice.reducer;
