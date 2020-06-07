import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  secondary?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  secondary,
  ...rest
}) => {
  return (
    <S.Button
      type="button"
      disabled={disabled || loading}
      {...rest}
      secondary={secondary ? 1 : 0}
    >
      {loading ? <FiLoader /> : children}
    </S.Button>
  );
};

export default Button;
