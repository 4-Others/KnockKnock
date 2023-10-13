import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ScheduleData} from '../dataConvert';

export type ScheduleItems = Record<string, ScheduleData[]>;

type ScheduleState = {
  items: ScheduleItems;
};

const initialState: ScheduleState = {
  items: {},
};
console.log('Inside scheduleSlice');
export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setScheduleReducer: (state, action: PayloadAction<ScheduleItems>) => {
      state.items = action.payload;
    },
    postScheduleReducer: (state, action: PayloadAction<ScheduleData>) => {
      const newItem = action.payload;
      if (!state.items[newItem.scheduleId]) {
        state.items[newItem.scheduleId] = [];
      }
      state.items[newItem.scheduleId].push(newItem);
    },
  },
});

export const {setScheduleReducer, postScheduleReducer} = scheduleSlice.actions;
export default scheduleSlice.reducer;
