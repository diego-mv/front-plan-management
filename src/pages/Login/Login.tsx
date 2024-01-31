import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../AppRoutes";
import { userAdapter } from "../../adapters/users/user.adapter";
import LoadingWrapper from "../../components/LoadingWrapper";
import useFetchAndLoad from "../../hooks/useFetchAndLoad.hook";
import { LoggedDto } from "../../models";
import { TokenInfo } from "../../models/common/token.model";
import { User } from "../../models/users/user.model";
import { createToken } from "../../redux/states/user/token.state";
import { createUser } from "../../redux/states/user/user.state";
import { AppStore } from "../../redux/store";
import { login } from "../../services/auth/auth.service";
import { SnackbarUtilities } from "../../utilities";
import './Login.css';
import { useTranslation } from 'react-i18next';

export const Login = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation()

    useEffect(() => {
        if (userState && userState.email) {
            SnackbarUtilities.toast("Sesión iniciada", { preventDuplicate: true })
            navigate(PRIVATE_ROUTES.HOME)
        }
    }, [userState, navigate])

    const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const userApi: LoggedDto = await callEndpoint(login(email, password));
        const userLogged: User | null = userAdapter(userApi.user);

        const tokenInfo: TokenInfo = {
            token: userApi.access_token,
            expiresIn: userApi.expiresIn,
            date: new Date()
        };

        dispatch(createUser(userLogged));
        dispatch(createToken(tokenInfo));

        if (localStorage.getItem('redirect-url')) {
            const { pathname } = new URL(localStorage.getItem('redirect-url') as string);
            localStorage.removeItem('redirect-url');

            navigate(pathname);
        } else {
            navigate(PRIVATE_ROUTES.HOME)
        }
    };

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    return (
        <LoadingWrapper loading={loading}>
            <div className="container-login">
                <div className="card-login">
                    <h2 className="title-login"><VpnKeyIcon fontSize="large" style={{ verticalAlign: 'middle' }} /> {t('login')}</h2>

                    <p className="text-login">{t('msgLogin')}</p>
                    <Box
                        component="form"
                        className="form-container"
                        autoComplete="on"
                    >
                        <TextField
                            className="input-login"
                            key='email'
                            name='email'
                            type="text"
                            color="primary"
                            variant="outlined"
                            label="Email"
                            value={email}
                            onChange={handleEmail}
                        ></TextField>
                        <TextField
                            className="input-login"
                            key='password'
                            name='password'
                            type="password"
                            color="primary"
                            variant="outlined"
                            label={t('password')}
                            value={password}
                            onChange={handlePassword}
                        ></TextField>
                        <Button
                            className="btn-login"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}>{t('login')}</Button>
                    </Box>
                </div>
            </div>
        </LoadingWrapper>
    )
};

export default Login;