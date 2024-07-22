import React from 'react';
import './formFields.css';

type InputProps = {
  type: 'text' | 'date' | 'file';
  label: string;
  value: string;
  name: string;
  placeholder: string;
  error: boolean;
  min?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  min,
  onChange,
}) => {
  return (
    <div className="input-field">
      <label
        className="input-field__label"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="input-field__input"
        min={min}
        required
      />
      {error && <p className="input-field__error">{name} field is empty</p>}
    </div>
  );
};

export default InputField;
