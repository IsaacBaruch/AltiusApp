import React, { useEffect } from 'react';

interface InputProps {
  value: string;
  onChange: (event: string) => void;  // Typing the onChange event
  id?: string;
  type?: string,
  placeholder?: string; // Optional placeholder prop
}

export const InputTypes = {
    Text: 'text',
    Number: 'number',
    Date: 'date',
    Time: 'time',
    Password: 'password'
}

const TextBox: React.FC<InputProps> = ({ id, value, onChange, placeholder, type = InputTypes.Text }) => {

    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            id={id}
            className="textbox"
            type={type}
            value={value}
            onChange={onValueChanged}
            placeholder={placeholder}
        />
    );
};


export default TextBox;