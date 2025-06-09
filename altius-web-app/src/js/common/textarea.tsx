import React, { useEffect } from 'react';

interface InputProps {
  value: string;
  onChange?: (event: string) => void;  // Typing the onChange event
  id?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  disabled?: boolean;
  limit?: number;
}

const Textarea: React.FC<InputProps> = ({ id, value, onChange, placeholder, rows = 3, cols = 30, disabled = false, limit = Infinity }) => {

    const onValueChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(event.target.value);
    };

    return (
        <textarea
            className={'textarea'}
            rows={rows}
            cols={cols}
            disabled={disabled}
            value={value}
            onChange={onValueChanged}
            placeholder={placeholder}
            maxLength={limit}
        />
    );
};


export default Textarea;