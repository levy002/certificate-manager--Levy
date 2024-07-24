import './formFields.css';
import formatValue from '../../utils/formatInputValue';

type InputProps = {
  type: 'text' | 'date';
  label: string;
  value: string | Date | null;
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
  const inputValue = formatValue(type, value);

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
        value={inputValue}
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
