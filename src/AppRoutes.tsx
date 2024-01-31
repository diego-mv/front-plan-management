
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './guards/auth.guard';
import Layout from './components/Layout/Layout';

const Login = lazy(() => import('./pages/Login/Login'));
const Home = lazy(() => import('./pages/Home/Home'));
const Users = lazy(() => import('./pages/Users/Users'));
const Skills = lazy(() => import('./pages/Skills/Skills'));
const CareerPlan = lazy(() => import('./pages/CareerPlan/CareerPlan'));

export const PUBLIC_ROUTES = {
    LOGIN: '/login'
}
export const PRIVATE_ROUTES = {
    HOME: '/home',
    ADMIN_USERS: '/manageusers',
    ADMIN_SKILLS: '/manageskills',
    CAREER_PLAN: '/careerplan'
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Layout><h1>Not found</h1></Layout>} />
                <Route path="/" element={<Login />} />
                <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
                <Route element={<AuthGuard />}>
                    <Route path={PRIVATE_ROUTES.HOME} element={<Layout><Home /></Layout>} />
                    <Route path={PRIVATE_ROUTES.ADMIN_USERS} element={<Layout><Users /></Layout>} />
                    <Route path={PRIVATE_ROUTES.ADMIN_SKILLS} element={<Layout><Skills /></Layout>} />
                    <Route path={PRIVATE_ROUTES.CAREER_PLAN} element={<Layout><CareerPlan /></Layout>} />
                </Route>
            </Routes >
        </BrowserRouter >
    );
};

export default AppRoutes;
