import { AuthContext, AuthContextType } from '../contexts/auth-context';
import { ReactNode, useState, useEffect } from 'react';
import { localStorageSave, localStorageLoad } from '../utils/localStorage';
import axios from './axiosInstance';
import { AxiosResponse } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = localStorageLoad('token');

    if (loadToken) {
      const jwt: JwtPayload = jwtDecode(loadToken);
      const currentTimestamp = Math.ceil(Date.now() / 1000);

      if (jwt?.exp && currentTimestamp >= jwt?.exp) {
        setToken(null);
      } else {
        setToken(loadToken);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    return axios
      .post('/users/auth', {
        username,
        password,
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          localStorageSave('token', res.data.token);
          setToken(res.data.token);
          setError(null);
          navigate('/');
        }
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  const value: AuthContextType = {
    token: token,
    login: handleLogin,
    error: error,
    loading,
  };

  if (loading) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
