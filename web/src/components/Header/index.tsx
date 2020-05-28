import React from 'react';

import { Link } from 'react-router-dom';
import * as S from './styles';

import Button from '../Button';

const Header: React.FC = () => {
  return (
    <S.Header>
      <S.Container>
        <Link to="/">
          <S.Logo>Opina</S.Logo>
        </Link>

        <S.SignWrrapper>
          <S.SignInLink to="/signin">Logar</S.SignInLink>
          <Link to="/signup">
            <Button>Cadastrar</Button>
          </Link>
        </S.SignWrrapper>
      </S.Container>
    </S.Header>
  );
};

export default Header;
