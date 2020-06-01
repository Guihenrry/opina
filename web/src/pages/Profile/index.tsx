import React from 'react';
import {
  FiUser,
  FiFolderPlus,
  FiFolder,
  FiMessageCircle,
  FiPower,
} from 'react-icons/fi';

import { Outlet } from 'react-router';
import * as S from './styles';
import useAuth from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <S.Container>
      <S.Navigation>
        <S.NavigationList>
          <S.NavigationItem>
            <S.NavigationLink to="edit" activeClassName="active">
              Meu perfil <FiUser />
            </S.NavigationLink>
          </S.NavigationItem>

          <S.NavigationItem>
            <S.NavigationLink to="add-post" activeClassName="active">
              Adicionar postagem <FiFolderPlus />
            </S.NavigationLink>
          </S.NavigationItem>

          <S.NavigationItem>
            <S.NavigationLink to="posts" activeClassName="active">
              Minhas postagens <FiFolder />
            </S.NavigationLink>
          </S.NavigationItem>

          <S.NavigationItem>
            <S.NavigationLink to="opinions" activeClassName="active">
              Minhas opiniões <FiMessageCircle />
            </S.NavigationLink>
          </S.NavigationItem>

          <S.NavigationItem>
            <S.SignOutButton type="button" onClick={signOut}>
              Sair do aplicativo <FiPower />
            </S.SignOutButton>
          </S.NavigationItem>
        </S.NavigationList>
      </S.Navigation>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};

export default Profile;
