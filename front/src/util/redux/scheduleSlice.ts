import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ScheduleData, ScheduleWithTagResponse} from '../dataConvert';

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
    postScheduleReducer: (state, action: PayloadAction<ScheduleData | ScheduleWithTagResponse>) => {
      let newItem: ScheduleData | undefined;

      if ('tag' in action.payload && action.payload.tag.name === '전체') {
        newItem = action.payload;
      } else if ('body' in action.payload && action.payload.body.data) {
        newItem = action.payload.body.data.schedules;
      }

      if (!newItem) {
        return;
      }
      if (!state.items[newItem.scheduleId]) {
        state.items[newItem.scheduleId] = [];
      }
      state.items[newItem.scheduleId].push(newItem);
    },
  },
});

export const {setScheduleReducer, postScheduleReducer} = scheduleSlice.actions;
export default scheduleSlice.reducer;
