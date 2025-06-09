import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './DataStore';
import { loginWebsiteThunk, getWebsitesThunk } from '../api/ApiFactory';


export enum websiteListStatus {
    Idle = 'idle',
    Pending = 'pending',
    Failed = 'failed',
    Succeeded = 'succeeded',
    LoginSucceeded = 'login_succeeded',
    LoginFailed = 'login_failed',
}

export interface WebsiteEntity {
    id: number;
    name: string;
    url: string;
    username: string;
    password: string
};

// Define a type for the slice state
interface WebsiteState {
    list: Array<WebsiteEntity>;
    websiteInfo: { token?: string, user?: object };
    status: websiteListStatus;
    error: string|any;
}
  
// Define the initial state using that type
const initialState: WebsiteState = {
    list: [],
    websiteInfo: {},
    status: websiteListStatus.Idle,
    error: ''
}

export const getWebsites = getWebsitesThunk;
export const loginWebsite = loginWebsiteThunk;

export const WebsiteSlice = createSlice({
  name: 'website',
  initialState,
  reducers: {
    clearWebsiteInfo: (state) => {
        state.status = websiteListStatus.Idle;
        state.websiteInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getWebsites.pending, (state) => {
            state.status = websiteListStatus.Pending;
        })
        .addCase(getWebsites.fulfilled, (state, action) => {
            state.status = websiteListStatus.Succeeded;
            state.list = action.payload.data;
        })
        .addCase(getWebsites.rejected, (state, action) => {
            state.status = websiteListStatus.Failed;
            state.error = action.error.message;
        })
        .addCase(loginWebsite.pending, (state, action) => {
            state.status = websiteListStatus.Pending;
        })
        .addCase(loginWebsite.fulfilled, (state, action) => {
            state.websiteInfo = action.payload.data;
            state.status = websiteListStatus.LoginSucceeded;
        })
        .addCase(loginWebsite.rejected, (state, action) => {
            state.status = websiteListStatus.LoginFailed;
            state.error = action.payload;
            state.websiteInfo = {};
        });
  },
});

// The function below is called a selector and allows us to select a value from the state.
// Selectors can also be defined inline where they're used instead of in the slice file.
// For example: `useSelector((state) => state.counter.value)`
export const selectWebsites = (state:RootState) => state.websites.list
export const selectWebsiteInfo = (state:RootState) => state.websites.websiteInfo
export const selectWebsiteStatus = (state:RootState) => state.websites.status;
export const selectWebsiteError = (state:RootState) => state.websites.error;

export const { clearWebsiteInfo } = WebsiteSlice.actions;

const WebsiteReducer = WebsiteSlice.reducer;
export default WebsiteReducer;