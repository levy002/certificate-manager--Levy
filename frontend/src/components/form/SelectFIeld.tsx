import { Options } from "../../helper/SelectOptions";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  value: string;
  name: string;
  placeholder: string;
  error: boolean;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField = (props: SelectProps): JSX.Element => {
  const { label, options, value, onChange, error, name, placeholder } = props;

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
        {placeholder && <option disabled>{placeholder}</option>}
        <Options options={options} />
      </select>
      {error && <p className="select-field__error">{name} field is empty!</p>}
    </div>
  );
};

export default SelectField;
