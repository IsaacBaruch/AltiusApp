import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import LoginContextProvider from './js/contexts/LoginContextProvider';
import App from './App';
import DataStore from './js/reducers/DataStore';
import { MessageProvider } from './js/contexts/MessageContext';

const modalRoot = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(modalRoot);

root.render(
    <Provider store={DataStore}>
        <React.StrictMode>
            <MessageProvider>
                <LoginContextProvider>
                    <App />
                </LoginContextProvider>
            </MessageProvider>
        </React.StrictMode>
    </Provider>
);

