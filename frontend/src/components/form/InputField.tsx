import './FormFields.css';
import { useI18n } from '../../contexts/LanguageContext';
import formatValue from '../../utils/FormatInputValue';

type InputProps = {
  type: 'text' | 'date';
  label: string;
  value: string | Date | null;
  name: string;
  placeholder: string;
  error: boolean;
  min?: string;
  max?: string;
  required?: boolean;
  readonly?: boolean;
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
  max,
  onChange,
  required,
  readonly,
}) => {
  const { translate } = useI18n();
  const inputValue = formatValue(type, value);

  return (
    <div className="input-field">
      <label
        className="input-field__label"
        htmlFor={label}
      >
        {translate(label)}
      </label>
      <input
        type={type}
        id={label}
        value={inputValue}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="input-field__input"
        min={min}
        max={max}
        required={required}
        readOnly={readonly}
      />
      {error && <p className="input-field__error">{name} field is empty</p>}
    </div>
  );
};

export default InputField;
