import React from 'react';

import { Link } from 'react-router-dom';
import * as S from './styles';

import ToggleTheme from '../ToggleTheme';
import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import Avatar from '../Avatar';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <S.Header>
      <S.Container>
        <S.LogoLink to="/">Opina</S.LogoLink>

        <S.Right>
          <ToggleTheme />

          {user ? (
            <S.ProfileLink to="/profile/edit">
              <Avatar url={user.avatar_url} name={user.name} />
            </S.ProfileLink>
          ) : (
            <S.SignWrrapper>
              <S.SignInLink to="/signin">Logar</S.SignInLink>
              <Link to="/signup">
                <Button>Cadastrar</Button>
              </Link>
            </S.SignWrrapper>
          )}
        </S.Right>
      </S.Container>
    </S.Header>
  );
};

export default Header;
