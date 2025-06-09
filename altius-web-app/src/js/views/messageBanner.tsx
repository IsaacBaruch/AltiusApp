import React, { useState, useEffect, useContext }  from 'react';
import { useMessage } from '../contexts/MessageContext';

const MessageBanner: React.FC = () => {
    const { message, clearMessage } = useMessage();

    useEffect(() => {
        if (message) {
        const timer = setTimeout(() => {
            clearMessage();
        }, 5000);

        return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    if (!message) {
        return null;
    } 

    return (
        <div className='message-banner-view' >
            {message}
        </div>
    );
};

export default MessageBanner;