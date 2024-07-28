import './FormFields.css';
import { useI18n } from '../../contexts/LanguageContext';
import Options from '../../helper/SelectOptions';

type SelectProps<T> = {
  label: string;
  value: T;
  name: string;
  placeholder: string;
  error: boolean;
  options: T[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField = <T extends string>(props: SelectProps<T>): JSX.Element => {
  const { translate } = useI18n();
  const { label, options, value, onChange, error, name, placeholder } = props;

  return (
    <div className="select-field">
      <label
        className="select-field__label"
        htmlFor={name}
      >
        {translate(label)}
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
