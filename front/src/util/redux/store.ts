import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import {scheduleSlice} from './scheduleSlice';
import {boardSlice} from './boardSlice';
import {BoardItem} from '../dataConvert';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    schedule: scheduleSlice.reducer,
    board: boardSlice.reducer,
  },
});

export type RootState = {
  board: BoardItem[];
};
