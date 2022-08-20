import { createSlice } from '@reduxjs/toolkit';

interface UserAuthState {
  isLoggedIn: boolean;
  uuid: string | null;
  username: string | null;
  role: string | null;
}

const initialState: UserAuthState = {
  uuid: null,
  isLoggedIn: false,
  username: null,
  role: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.uuid = action.payload.uuid;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
    },
    setSignOut: (state) => {
      state.uuid = null;
      state.username = null;
      state.isLoggedIn = false;
      state.role = null;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { setSignIn, setSignOut, setRole } = authSlice.actions;

export const selectIsLoggedIn = (state: { userAuth: { isLoggedIn: any } }) =>
  state.userAuth.isLoggedIn;
export const selectUserName = (state: { userAuth: { username: any } }) =>
  state.userAuth.username;
export const selectUserRole = (state: { userAuth: { role: any } }) =>
  state.userAuth.role;
export const selectUserUuid = (state: { userAuth: { uuid: any } }) =>
  state.userAuth.uuid;

export default authSlice.reducer;
