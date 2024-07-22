import React from 'react';
import './formFields.css';

interface SelectOption {
  value: string;
}

type SelectProps = {
  label: string;
  value: string;
  name: string;
  placeholder: string;
  error: boolean;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  name,
  placeholder,
}) => {
  return (
    <div className="select-field">
      <label
        className="select-field__label"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        id={label}
        value={value}
        name={name}
        onChange={onChange}
        className="select-field__select"
      >
        <option disabled>{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.value}
          </option>
        ))}
      </select>
      {error && <p className="select-field__error">{name} field is empty!</p>}
    </div>
  );
};

export default SelectField;
