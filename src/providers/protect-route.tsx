import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useAuth();

  if (!token && !loading) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
