import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../utilities/enums/languages.enum';

const LanguageSelector = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { i18n } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeLang = (code: string) => {
        i18n.changeLanguage(code)
        handleClose();
    }

    return (
        <>

            <Button
                color='primary'
                variant='contained'
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {
                    LANGUAGES.find(l => l.code === i18n.language)?.label ?? ""
                }
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    LANGUAGES.map(lang => (
                        <MenuItem onClick={() => onChangeLang(lang.code)}
                        >{lang.label}</MenuItem>
                    ))
                }
            </Menu></>
    )
}

export default LanguageSelector