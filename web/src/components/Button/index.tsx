import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <S.Button type="button" disabled={disabled || loading} {...rest}>
      {loading ? <FiLoader /> : children}
    </S.Button>
  );
};

export default Button;
