import React from 'react';

interface CheckboxProps {
    id: string;
    checked: boolean;
    onChange: (event: boolean) => void;  // Typing the onChange event
    text?: string;
    disabled?: boolean;
    className?: string;
  }

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, text, onChange, disabled, className }) => {
    
    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    const inputView = (
        <input
            id={id}
            type={'checkbox'}
            checked={checked}
            onChange={onValueChanged}
            // defaultChecked={checked}
            // title={tooltip}
            disabled={disabled}
            tabIndex={-1}
        />

    )

        return (
            <label className={className} htmlFor={id}  >
                { inputView }
                <span>{text}</span>
            </label>
         );
}

export default Checkbox;