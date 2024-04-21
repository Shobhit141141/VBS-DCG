import { Navigate, Outlet } from 'react-router-dom';
import { verifyJWT } from '../../api/authApi'; // Assuming this fetches and verifies JWT
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Replace with your context path

const ProtectedRoutes = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Use context for state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyJWT();
        if (response.status === 200) {
          setIsLoggedIn(true); // Update context state
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false); // Assume error implies invalid JWT
        console.error('Error verifying JWT:', error);
      }
    };

    checkAuth();
  }, []); // Empty dependency array to run only once on component mount

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;
