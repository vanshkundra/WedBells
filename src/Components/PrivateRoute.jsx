import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/Login-Signup" />;
};

export default PrivateRoute;
