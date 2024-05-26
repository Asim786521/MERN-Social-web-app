import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, element }) => {
  return user ? element : <Navigate replace to="/login" />;
};



export default PrivateRoute;