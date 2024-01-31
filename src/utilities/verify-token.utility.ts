import { useDispatch } from "react-redux";
import { getTokenLocalStorage } from "../services"
import { resetToken } from "../redux/states/user/token.state";
import { resetUser } from "../redux/states/user/user.state";

export const verifyToken = () => {
    const dispatch = useDispatch();
    const tokenInfo = getTokenLocalStorage();
    if (!tokenInfo) {
        return false;
    }

    const nowDate: number = Math.floor(Date.now() / 1000);
    const expireDate: number = Math.floor((new Date(tokenInfo.date)).getTime() / 1000) + tokenInfo.expiresIn;

    if (nowDate > expireDate) {
        dispatch(resetToken());
        dispatch(resetUser());
        return false;
    }

    return true;
}