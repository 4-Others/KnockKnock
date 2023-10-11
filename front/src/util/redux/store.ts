import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import {scheduleSlice} from './scheduleSlice';
import boardReducer from './boardSlice';
import {BoardItem} from '../dataConvert';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    schedule: scheduleSlice.reducer,
    board: boardReducer,
  },
});

export type RootState = {
  board: BoardItem[];
};
