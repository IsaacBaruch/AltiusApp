import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './DataStore';
import { loginThunk } from '../api/ApiFactory';

export enum loginStatus {
    Idle = 'idle',
    Pending = 'pending',
    Failed = 'failed',
    Succeeded = 'succeeded',
}

interface User {
    id: number;
    name: string;
    last: string;
    mail: string;
    created: string;
};

interface AuthState {
    user: User | null;
    token: string | null;
    status: loginStatus;
    error: string | null;
};

// Define the initial state using that type
const initialState: AuthState = {
    user: null,
    token: null,
    status: loginStatus.Idle,
    error: null,
};

export const loginUser = loginThunk;

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    
    logout: (state) => {
        console.log('LoginSlice:: logout')
        state.user = null;
        state.status = loginStatus.Idle;
        state.token = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = loginStatus.Pending;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = loginStatus.Succeeded;
        const { user, token } = action.payload;
        state.user = user; 
        state.token = token; 
        localStorage.setItem('mail', user.mail);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = loginStatus.Failed;
        state.error = action.error.message || 'Login failed';
      });
  },
});

// The function below is called a selector and allows us to select a value from the state.
// Selectors can also be defined inline where they're used instead of in the slice file.
// For example: `useSelector((state) => state.counter.value)`
export const selectIsLogin = (state:RootState) => state.login.token;

export const selectLoginStatus = (state:RootState) => state.login.status;

// Action creators are generated for each case reducer function
export const { logout } = LoginSlice.actions;


const LoginReducer = LoginSlice.reducer;
export default LoginReducer;