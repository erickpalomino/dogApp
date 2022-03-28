import { Navigate, Outlet } from 'react-router';


const PublicRoutes = () => {
  const authToken = localStorage.getItem('token');
  if (authToken) return <Navigate to="/dog/find" />;
  else return <Outlet />;
};

export default PublicRoutes;