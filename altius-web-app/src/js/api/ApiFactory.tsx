import { createAsyncThunk } from "@reduxjs/toolkit";
import AltiusApi from "./AltiusApi";
import DemoApi from "./DemoApi";

const isDemo: boolean = false;

export interface Api {
    loginByMail(data: { mail:string, password:string}): Promise<any>;
    getWebsites(token: string): Promise<any>;
    loginWebsite(data: { username: string, password: string, id: number, token: string }): Promise<any>;
    downloadFile(id: number, token: string): string;
};

const ApiFactory = {

    getApi: (): Api => {
        if (isDemo) {
            return DemoApi;
        }
        return AltiusApi;
    }
};

export default ApiFactory;


const api: Api = ApiFactory.getApi();

export const createAsyncThunkWithArgs = (typePrefix:string, asyncFunction: Function): any => {
    return createAsyncThunk(typePrefix, async (args, { rejectWithValue }) => {
        try {
            return await asyncFunction(args);
        } catch (error: any) {
            console.log("error", error)
            return rejectWithValue(error.message || error);
        }
    });
};

export const loginThunk = createAsyncThunkWithArgs('auth/loginUser', api.loginByMail);

export const getWebsitesThunk = createAsyncThunkWithArgs('auth/getWebsites', api.getWebsites);

export const loginWebsiteThunk = createAsyncThunkWithArgs('auth/loginWebsite', api.loginWebsite);


