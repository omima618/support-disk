import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import { useAuthStatus } from '../hooks/useAuthStatus';

const PrivateRoutes = () => {
    const { isLoggedIn, checkStatus } = useAuthStatus();
    if (checkStatus) {
        return <Spinner />;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
