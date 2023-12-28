import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-300 text-gray-700';
      case 'primary':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <button
      className={`py-2 px-4 rounded-md focus:outline-none ${getButtonStyle()}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;