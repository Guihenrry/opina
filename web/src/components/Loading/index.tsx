import React from 'react';

import * as S from './styles';

const Loading: React.FC = () => {
  return (
    <S.Container>
      <S.Circle />
      <S.Circle />
      <S.Circle />
      <S.Circle />
    </S.Container>
  );
};

export default Loading;
