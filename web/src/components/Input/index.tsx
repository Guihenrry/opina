import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  FocusEvent,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  error: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, error, ...rest }) => {
  const [isFocused, setIsFocused] = useState(0);
  const [isFilled, setIsFilled] = useState(0);

  const hanldeInputFocus = useCallback(() => {
    setIsFocused(1);
  }, []);

  const hanldeInputBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(0);
    setIsFilled(event.target.value ? 1 : 0);
  }, []);

  return (
    <S.Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon />}
      <S.Input
        {...rest}
        onFocus={hanldeInputFocus}
        onBlur={hanldeInputBlur}
        isErrored={error}
      />
      {error && (
        <S.Error>
          <FiAlertCircle />
          <S.ErrorTooltip>{error}</S.ErrorTooltip>
        </S.Error>
      )}
    </S.Container>
  );
};

export default Input;
