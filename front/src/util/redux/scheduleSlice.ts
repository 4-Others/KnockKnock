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
    setScheduleItems: (state, action: PayloadAction<ScheduleItems>) => {
      state.items = action.payload;
    },
    addScheduleItem: (state, action: PayloadAction<ScheduleData>) => {
      const newItem = action.payload;
      if (!state.items[newItem.scheduleId]) {
        state.items[newItem.scheduleId] = [];
      }
      state.items[newItem.scheduleId].push(newItem);
    },
  },
});

export const {setScheduleItems, addScheduleItem} = scheduleSlice.actions;
export default scheduleSlice.reducer;
