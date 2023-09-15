import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/Login';
import AuthProvider from './providers/auth-provider';
import ProtectedRoute from './providers/protect-route';
import Home from './components/home';
import AppProvider from './providers/app-provider';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
