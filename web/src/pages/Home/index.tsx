import React from 'react';

import * as S from './styles';
import { Button } from '../../components/Button/styles';

const Home: React.FC = () => {
  return (
    <>
      <S.Intro>
        <S.IntroContent>
          <S.IntroTitle>
            O <S.IntroLogo>Opina</S.IntroLogo> é sua experiência
          </S.IntroTitle>
          <S.IntroText>
            O opina é o lugar certo para se expressar e saber a opinião do
            publico sobre um produto.
          </S.IntroText>
          <Button>Ultimas postagens</Button>
        </S.IntroContent>
      </S.Intro>

      <S.Space />
    </>
  );
};

export default Home;
