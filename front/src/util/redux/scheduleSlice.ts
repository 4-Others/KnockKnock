import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: {}, // 초기 상태
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setScheduleItems: (state, action) => {
      state.items = action.payload; // items 상태 업데이트
    },
  },
});

export const {setScheduleItems} = scheduleSlice.actions;
export default scheduleSlice;
