import { Navigate, Outlet } from "react-router-dom";
import {useContext} from 'react';
import { StoreContext } from "../StoreProvider";


const useAuth = () => {
    const {isLoggedIn} = useContext(StoreContext);
    const user = {loggedIn: isLoggedIn};
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
