import React from 'react';
import useTheme from '../../hooks/useTheme';

import * as S from './styles';

const ToggleTheme: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <S.Wrapper type="button" onClick={toggleTheme}>
      <S.Circle />
    </S.Wrapper>
  );
};

export default ToggleTheme;
