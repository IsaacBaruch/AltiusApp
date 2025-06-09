import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/button';
import Textarea from '../common/textarea';
import TextBox, { InputTypes } from '../common/textbox';
import { ModalContext } from '../contexts/contexts';
import { useMessage } from '../contexts/MessageContext';
import { useAppDispatch } from '../reducers/DataStore';
import { selectIsLogin } from '../reducers/loginSlice ';
import { getWebsites, loginWebsite, WebsiteEntity, selectWebsites, selectWebsiteStatus, websiteListStatus, selectWebsiteInfo, clearWebsiteInfo, selectWebsiteError } from '../reducers/websiteSlice';
import ModalView from './modalView';


const MainView: React.FC = () => {

    const modalContext = useContext(ModalContext);
    const { setMessage } = useMessage();
    const dispatch = useAppDispatch();
    const websites: Array<any> = useSelector(selectWebsites);
    const websiteInfo: object = useSelector(selectWebsiteInfo);
    const token = useSelector(selectIsLogin);
    
    const websiteState = useSelector(selectWebsiteStatus);
    const websiteError = useSelector(selectWebsiteError);

    const [selectedWebsite, setSelectedWebsite] = useState<WebsiteEntity>();

    useEffect(() => {
        onRefreshList();
    }, []);

    useEffect(() => {
        switch (websiteState) {
            case websiteListStatus.LoginFailed: {
                setMessage(websiteError)
            } break;
            
            default:
                break;
        }
    }, [websiteState])

    const onRefreshList = () => {
        dispatch(getWebsites(token))
    }
    
    const getModalView = () => {
        if (!selectedWebsite) {
            return null;
        }

        let modalTitle = "", modelContent = null;
        if (Object.keys(websiteInfo).length) {
            modalTitle = `Website Result ${selectedWebsite.name}`;
            modelContent = <WebsiteInfoView data={websiteInfo}/> 
        } else {
            modalTitle = 'Set Credentials';
            modelContent = <CredentialsView website={selectedWebsite}/>
        }

        const onCloseModel = () => {
            dispatch(clearWebsiteInfo());
            modalContext?.setValue('');
        }

        return (
            <ModalView title={modalTitle} onClose={onCloseModel}>
               { modelContent }
            </ModalView>
        )
    }

    const onOpenWebsite = (item: WebsiteEntity) => {
        modalContext?.setValue("WebsiteEntity");
        setSelectedWebsite(item);
    }

    const listView = websites.map((website: WebsiteEntity) => {
        const { id, name, url } = website;

        return (
            <div key={id} className='flx-row' style={{ gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ minWidth: '80px' }}>{name}</label>
                <label style={{ minWidth: '80px' }}>{url}</label>
                <Button text='Open' onClick={onOpenWebsite.bind(this, website)}/> 
            </div>
        )
    });

    if (!listView.length) {
        let isLoading: boolean = false;
        if (isLoading) {
            for (let i = 0; i < 5; i++) {
                listView.push(<div key={i} className='demo shimmer'></div>);
            }
        } else {
            listView.push(<div key='no-data'><label style={{ fontSize: '30px' }}>No Data Available</label></div>)
        }
    }
    
    return (
        <div className='main-view flx-col'>
            <Button text='Refresh List' onClick={onRefreshList}/>
            { getModalView () }
            <div className='flx-col scrollbar websites-list' style={{ gap: '10px', maxHeight: '300px' }}>
                { listView }
            </div>
        </div>
    );
};
export default MainView;

type CredentialsProps = {
    website: WebsiteEntity;
};
const CredentialsView: React.FC<CredentialsProps> = ({ website }) => {
    
    const dispatch = useAppDispatch();
    const token = useSelector(selectIsLogin);
    const [username, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        setName('');
        setPassword('');
    }, []);

    const onSend = () => {
        if (!username || !password) {
            return;
        }
        dispatch(loginWebsite({ username, password, id: website.id, token }))
    }
    return (
        <div className='flx-col' style={{ gap: "15px", minWidth: '250px' }}>
            <TextBox value={username} placeholder='demo@altius.com' onChange={setName}/>
            <TextBox value={password} placeholder="password" onChange={setPassword} type={InputTypes.Password}/>
            <Button disabled={!username || !password} text='Send' onClick={onSend}/> 
        </div>
    )
}

type WebsiteInfosProps = {
    data: { token?: string, user?: object };
};
const WebsiteInfoView: React.FC<WebsiteInfosProps> = ({ data }) => {
    
    const modalContext = useContext(ModalContext);
    const dispatch = useAppDispatch();
    const { token, user } = data;

    const onclose = () => {
        dispatch(clearWebsiteInfo());
        modalContext?.setValue('');
    };

    return (
        <div className='flx-col website-info'>
            <div className='flx-col'>
                <label>Token</label>
                <Textarea value={token || ''} disabled={true}/>
            </div>
            <div className='flx-col'>
                <label>Info</label>
                <Textarea value={JSON.stringify(user)} disabled={true}/>
            </div>
            <Button text='Close' onClick={onclose}/> 
        </div>
    )
}