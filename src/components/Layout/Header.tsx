import AccountCircle from '@mui/icons-material/AccountCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../AppRoutes';
import LanguageSelector from '../../i18n/LanguageSelector';
import { resetUser } from '../../redux/states/user/user.state';
import { AppStore } from '../../redux/store';

const Header = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(resetUser());
        navigate(PUBLIC_ROUTES.LOGIN);
    };

    const handleNavigateHome = () => {
        navigate(PRIVATE_ROUTES.HOME);
    }

    return (
        <Box sx={{ flexGrow: 1, margin: 0 }}>
            <AppBar position="static" sx={{ padding: '0 5rem' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleNavigateHome}>
                        <WorkspacesIcon fontSize='large' style={{ verticalAlign: 'bottom', color: '#e6af2e' }} /> {t('careerPlanManager')}
                    </Typography>
                    <div>
                        <LanguageSelector />
                    </div>
                    {userState.email && (
                        <div>
                            <IconButton
                                size="large"
                                aria-controls="menu-user"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-user"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;