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

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
