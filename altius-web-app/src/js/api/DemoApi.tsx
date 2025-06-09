import { Api } from "./ApiFactory";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const DemoApi:Api = {

    loginByMail: async (content: { mail:string, password:string }) => {
        await sleep(1000);
        return { user: { id: 83756, mail: content.mail, name: 'Baruch Isaac',  }, token: 'HFAD9AISG7HDI3ASUG3DA' }
    },

    loginWebsite: async (content: { username: string, password: string, id: number, token: string }): Promise<any> => {
        await sleep(1000);
        return { name: '111'}
    },

    getWebsites: async (token: string) => {
        await sleep(1000);
        return { data: [
            { id: 1, name: 'W1', url: 'https://fo1.altius.finance' },
            { id: 2, name: 'W2', url: 'https://fo2.altius.finance' },
        ]}
    },

    downloadFile: (id: number, token: string) => {
        // TODO
        return `${'aaa'}?id=${id}`
    }
}
export default DemoApi;
