import React from 'react';

interface TextareaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  rows = 4,
  placeholder = '',
  required = false,
  className = '',
  id,
}) => {
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}{required && '*'}</label>}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      ></textarea>
    </div>
  );
};

export default Textarea;
