import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: 0,
  id: '',
  email: '',
  username: '',
  birth: '',
  pushAgree: false,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 모든 사용자 정보 저장
    setLogin(state, action) {
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    setProfile(state, action) {
      state.userId = action.payload.userId;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.birth = action.payload.birth;
      state.pushAgree = action.payload.pushAgree;
      state.token = action.payload.token;
    },
    updateProfile(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.birth = action.payload.birth;
      state.pushAgree = action.payload.pushAgree;
    },
  },
});

export const {setLogin, setProfile, updateProfile} = userSlice.actions;
export default userSlice;
