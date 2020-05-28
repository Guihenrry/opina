import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, fullWidth, ...rest }) => {
  return (
    <S.Button type="button" fullWidth={fullWidth ? 1 : 0} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
