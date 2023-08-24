import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nickName: '',
  email: '',
  userId: '',
  token: {
    accessToken: '',
    refreshToken: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 모든 사용자 정보 저장
    setUser(state, action) {
      state.nickName = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    setNickName(state, action) {
      state.nickName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const {setUser, setNickName, setEmail, setUserId, setToken} = userSlice.actions;
export default userSlice;
