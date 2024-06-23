import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoutes = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;
