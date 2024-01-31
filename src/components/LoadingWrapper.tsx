import React, { ReactNode } from 'react';
import { CircularProgress } from "@mui/material";

interface LoadingWrapperProps {
    loading: boolean;
    children: ReactNode;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ loading, children }) => (
    <>
        {loading ? <div style={{ textAlign: 'center', marginTop: '2rem' }}><CircularProgress /> </div> : children}
    </>
);

export default LoadingWrapper;