import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardDataItem} from '../dataConvert';

const initialState: BoardDataItem[] = [];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardData: (state, action: PayloadAction<BoardDataItem[]>) => {
      return action.payload;
    },
  },
});

export const {setBoardData} = boardSlice.actions;
export default boardSlice.reducer;
