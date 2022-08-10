import { createSlice } from '@reduxjs/toolkit';

interface UserAuthState {
  isLoggedIn: boolean,
  username: string | null
  role: string | null
}

const initialState: UserAuthState = {
  isLoggedIn: false,
  username: null,
  role: null
};

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
      setSignIn: (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.username = action.payload.username;
      },
      setSignOut: (state) => {
        state.username = null;
        state.isLoggedIn = false;
        state.role = null
      },
      setRole: (state, action) => {
        state.role = action.payload.role
      }
    }
});

export const { setSignIn, setSignOut, setRole } = authSlice.actions;

export const selectIsLoggedIn = (state: { userAuth: { isLoggedIn: any; }; }) => state.userAuth.isLoggedIn;
export const selectUserName = (state: { userAuth: { username: any; }; }) => state.userAuth.username;
export const selectUserRole = (state: { userAuth: { role: any; }; }) => state.userAuth.role;


export default authSlice.reducer;