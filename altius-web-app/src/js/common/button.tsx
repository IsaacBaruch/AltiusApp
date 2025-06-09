import React, { ReactNode } from 'react';

interface ButtonProps {
    id?: string;
    text: string;
    onClick: () => void;
    tooltip?: string;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    customStyle?: object;
}

const Button: React.FC<ButtonProps> = ({ id, text, onClick, tooltip, disabled = false, className, children, customStyle  }) => {
  
    return (
        <button
            id={id}
            className={`button ${className || ''}`}
            onClick={onClick}
            title={tooltip}
            disabled={disabled}
            tabIndex={-1}
            style={customStyle}
        >
            {text}
            {children}
        </button >
    );
};


export default Button;