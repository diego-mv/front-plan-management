import { useSnackbar } from 'notistack';
import React from 'react';

let useSnackbarRef: any;
export const SnackbarUtilsConfigurator: React.FC = () => {
    useSnackbarRef = useSnackbar();
    return null;
};

export const SnackbarUtilities = {
    success(msg: string) {
        this.toast(msg, { variant: 'success' });
    },
    warning(msg: string) {
        this.toast(msg, { variant: 'warning' });
    },
    info(msg: string) {
        this.toast(msg, { variant: 'info' });
    },
    error(msg: string) {
        this.toast(msg, { variant: 'error' });
    },
    toast(msg: string, options: any) {
        useSnackbarRef.enqueueSnackbar(msg, { ...options });
    }
};