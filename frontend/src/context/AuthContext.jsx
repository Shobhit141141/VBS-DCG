import { createContext, useState, useEffect } from 'react';
import { verifyJWT } from '../../api/authApi';

const ADMIN_ID = import.meta.env.VITE_APP_ADMIN_ID;

const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  role: 'user', 
  setIsLoggedIn: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyJWT();
        if (response.status === 200) {
          setIsLoggedIn(true);
          const userId = localStorage.getItem('socId');
          if (userId === ADMIN_ID) {
            setRole('admin');
          } else {
            setRole('user');
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error('Error verifying JWT:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    isLoggedIn,
    isLoading,
    role,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
