import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PUBLIC_ROUTES } from "../AppRoutes";
import { AppStore } from "../redux/store";
import { verifyToken } from "../utilities";

export const AuthGuard = () => {
    const userState = useSelector((store: AppStore) => store.user);


    if (!userState.email || !verifyToken()) {
        localStorage.setItem('redirect-url', window.location.href)
    }

    return userState.email ? <Outlet></Outlet> : <Navigate replace to={PUBLIC_ROUTES.LOGIN}></Navigate>
}

export default AuthGuard;