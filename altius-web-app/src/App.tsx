import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoginContext } from './js/contexts/contexts';
import ModalContextProvider from './js/contexts/modalContext';
import { selectIsLogin } from './js/reducers/loginSlice ';
import LoginView from './js/views/loginView';
import MainView from './js/views/mainView';
import MessageBanner from './js/views/messageBanner';

import './style/App.scss';
import './style/common.scss';


const App = () => {

    const loginContext = useContext(LoginContext);
    const isLogin = useSelector(selectIsLogin);

    useEffect(() => {
        console.log('App::useEffect isLogin', loginContext?.value)
    }, []);
   
    useEffect(() => {
        console.log('App:: isLogin', loginContext?.value)
    }, [loginContext?.value]);

    let currentView = null;
    if (isLogin) {
        currentView = (
            <ModalContextProvider>
                <MainView />
            </ModalContextProvider>
        );
    } else {
        currentView = <LoginView />
    }


    return (
        <div className="App flx-col">
            <MessageBanner />
            { currentView }
        </div>
    );
};
export default App;