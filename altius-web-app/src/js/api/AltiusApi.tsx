import { Api } from "./ApiFactory";

const BaseUrl = 'http://localhost:8000/';

const AltiusAPi:Api = {

    loginByMail: async (content: { mail:string, password:string }) => {
        const url: string = `${BaseUrl}login`;
        const credentialsData = JSON.stringify(content);
        const response = await createHttpRequest(url, credentialsData);
        
        if (!response.ok) {
            try {
                const errorData = await response.json();
                throw new Error(`Login failed: ${errorData.detail}`);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                throw new Error('Login failed');
            }
        }
        return await response.json();
    },

    loginWebsite: async (content: { username: string, password: string, id: number, token: string }): Promise<any> => {
        const { username, password, id, token} = content;
        const url: string = `${BaseUrl}loginWebsite`;
        const credentialsData = JSON.stringify({ username, password, id });
        const response = await createHttpRequest(url, credentialsData, token);
        
        if (!response.ok) {
            try {
                const errorData = await response.json();
                throw new Error(`Login failed: ${errorData.detail}`);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                throw new Error('Login failed to this website');
            }
        }
        return await response.json();
    },

    getWebsites: async (token: string) => {
        const url: string = `${BaseUrl}websites`;
        const response = await createHttpRequest(url, '', token);
        
        if (!response.ok) {
            throw new Error('Get Websites failed');
        }
        return await response.json();
    },

    downloadFile: (id: number, token: string) => {
        return ``
    }
}
export default AltiusAPi;

export const createHttpRequest = (url: string, body: string, token?: string): Promise<any> => {
    let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': '*/*',
        'Authorization': token ? `Bearer ${token}` : ''
    }
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
    });
};
