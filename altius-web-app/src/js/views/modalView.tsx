import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../contexts/contexts';

interface ModalProps {
    title?: string;
    children: ReactNode;
    onClose?: () => void;
};

const ModalView: React.FC<ModalProps> = ({ title, children, onClose }) => {

    const modalContext = useContext(ModalContext);
    const [open, setOpen] = useState(false);
    const view: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOpen(Boolean(modalContext?.value))
    }, [modalContext?.value]);

    const onCloseView = () => {
        modalContext?.setValue('');
        onClose && onClose();
    }

    useEffect(() => {
        if (open) {
            document.addEventListener('click', clickEventListener);
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('click', clickEventListener);
            document.removeEventListener('keydown', handleEscape);
        }  
    }, [open]);

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onCloseView();
        }
      };

    const clickEventListener = (event: MouseEvent) => {
        if (!open) {
            return;
        }
        const isDescendant = (parent: HTMLElement, child: HTMLElement) => {
            var node = child.parentNode;
            while (node != null) {
                if (node == parent || parent.contains(node)) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
       }

       if (view.current !== null && event.target instanceof HTMLElement && event.target != view.current &&
        !view.current.contains(event.target) && !isDescendant(view.current, event.target)) {
            onCloseView();
            return;
       }
    }

    return (
        <div className='modal-overlay' style={{ display: open ? '' : 'none'}}>
            <div className='modal-view flx-col' ref={view}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='clickable close-modal' onClick={onCloseView}>
                    <path d="M17.4875 12.5124L18.5375 11.4624" stroke="#FF6666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.4625 18.5376L14.9 15.1001" stroke="#FF6666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5375 18.5374L11.4625 11.4624" stroke="#FF6666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.5 16.2V18.75C2.5 25 5 27.5 11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25" stroke="#FFCCCC" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <label className='header'>{title}</label>
                { children }
            </div>
        </div>
    )

};

export default ModalView;