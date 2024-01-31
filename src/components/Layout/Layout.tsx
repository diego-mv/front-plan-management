import { Box, CssBaseline } from "@mui/material";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import './Layout.css';

interface Props {
    children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header></Header>
            <Box className="content-page">
                <CssBaseline />
                {children}
            </Box>
            <Footer></Footer>
        </>
    )
}

export default Layout