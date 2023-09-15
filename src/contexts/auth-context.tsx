import { createContext, useContext } from 'react';

export interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuth = () => {
  return useContext(AuthContext);
};
