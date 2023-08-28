import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import scheduleSlice from './scheduleSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});

export default store;
