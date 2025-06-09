import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/button';
import Checkbox from '../common/checkbox';

import TextBox, { InputTypes } from '../common/textbox';
import { useMessage } from '../contexts/MessageContext';
import { useAppDispatch } from '../reducers/DataStore';
import { loginStatus, loginUser, selectLoginStatus } from '../reducers/loginSlice ';

const LoginView: React.FC = () => {

    const { setMessage } = useMessage();
    const loginState = useSelector(selectLoginStatus);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [rememeberMe, setRememeberMe] = useState(Boolean(localStorage.getItem('remember-me')));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('remember-me')) {
            setMail(localStorage.getItem('mail') || '');
        }
    }, []);
    
    useEffect(() => {
        if (loginState === loginStatus.Failed) {
            setMessage('שם משתמש או סיסמא לא נכונים')
        }
    }, [loginState]);

    const onCheckboxChanged = (checked: any) => {
        if (checked) {
            localStorage.setItem('remember-me', checked);
        } else {
            localStorage.removeItem('remember-me');
        }
        setRememeberMe(checked);
    }

    const onClickLogin = () => {
        if (!mail || !password) {
            alert('Fill all inputs')
            return;
        }
        // console.log('%c Parent rendered!', 'color: blue');
        dispatch(loginUser({ mail, password }));
    };

    const namePlaceHolder: string = 'mail';
    const passwordPlaceHolder: string = 'password';

    return (
        <div className='login-view flx-col'>
            <TextBox value={mail} type={InputTypes.Text} onChange={setMail} placeholder={namePlaceHolder}/>
            <TextBox value={password} type={InputTypes.Password} onChange={setPassword} placeholder={passwordPlaceHolder} />
            <Checkbox id='remember-me' text='Remember Me' checked={rememeberMe} onChange={onCheckboxChanged}/>
            <Button text='Sign In' disabled={loginState === loginStatus.Pending} className='default' onClick={onClickLogin}/>
        </div>
    );
};


export default LoginView;