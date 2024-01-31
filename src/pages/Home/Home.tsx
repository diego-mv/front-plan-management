import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleIcon from '@mui/icons-material/People';
import RouteIcon from '@mui/icons-material/Route';
import { Card, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from '../../AppRoutes';
import imgMain from '../../assets/plan_carrera.jpg';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigateUsers = () => {
        navigate(PRIVATE_ROUTES.ADMIN_USERS);
    };

    const handleNavigateSkills = () => {
        navigate(PRIVATE_ROUTES.ADMIN_SKILLS);
    };
    const handleNavigateCareerPlan = () => {
        navigate(PRIVATE_ROUTES.CAREER_PLAN);
    };


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className="card-img">
                <div className="dark-overlay"></div>
                <img src={imgMain} className="img-main" />
            </Grid>
            <Grid item xs={6}>
                <Card variant="outlined" className="card-home" onClick={handleNavigateUsers}>
                    <h3><PeopleIcon style={{ verticalAlign: 'bottom' }} /> Administrar usuarios</h3>
                    <p>
                        Gestiona la información de los usuarios, permitiendo crear, editar y eliminar perfiles, a
                        sí como acceder a detalles individuales acerca de sus habilidades.
                    </p>
                    <span className="button-link"><ChevronRightIcon /></span>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card variant="outlined" className="card-home" onClick={handleNavigateCareerPlan}>
                    <h3><RouteIcon style={{ verticalAlign: 'bottom' }} /> Administrar planes de carrera</h3>
                    <p>
                        Crea, edita o elimina los distintos planes de carrera disponibles para tus usuarios.
                    </p>
                    <span className="button-link"><ChevronRightIcon /></span>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card variant="outlined" className="card-home" onClick={handleNavigateSkills}>
                    <h3><AutoAwesomeIcon style={{ verticalAlign: 'bottom' }} /> Administrar habilidades</h3>
                    <p>
                        Realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las habilidades.
                    </p>
                    <span className="button-link"><ChevronRightIcon /></span>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home