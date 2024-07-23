/* eslint-disable react/button-has-type */
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
