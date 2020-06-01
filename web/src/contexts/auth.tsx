import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

export interface AuthContextType {
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  user: User;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthState {
  user: User;
  token: string;
}

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Opina:user');
    const token = localStorage.getItem('@Opina:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        user: JSON.parse(user),
        token,
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: Credentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Opina:user', JSON.stringify(user));
    localStorage.setItem('@Opina:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Opina:user');
    localStorage.removeItem('@Opina:token');

    api.defaults.headers.authorization = '';

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        ...data,
        user,
      });

      localStorage.setItem('@Opina:user', JSON.stringify(user));
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user: data.user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
