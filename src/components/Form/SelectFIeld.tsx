import React from 'react';

import Options from '../../helper/selectOptions';

type SelectProps<T> = {
  label: string;
  value: T;
  name: string;
  placeholder: string;
  error: boolean;
  options: T[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  getOptionValue: (option: T) => string;
  getOptionName: (option: T) => string;
};

const SelectField = <T,>(props: SelectProps<T>): JSX.Element => {
  const {
    label,
    options,
    value,
    onChange,
    error,
    name,
    placeholder,
    getOptionValue,
    getOptionName,
  } = props;

  return (
    <div className="select-field">
      <label
        className="select-field__label"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        className="select-field__select"
      >
        <option disabled>{placeholder}</option>
        <Options
          options={options}
          getOptionValue={getOptionValue}
          getOptionName={getOptionName}
        />
      </select>
      {error && <p className="select-field__error">{name} field is empty!</p>}
    </div>
  );
};

export default SelectField;
