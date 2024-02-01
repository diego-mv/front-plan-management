import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleIcon from '@mui/icons-material/People';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { Card, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from '../../AppRoutes';
import imgMain from '../../assets/plan_carrera.jpg';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleNavigateUsers = () => {
        navigate(PRIVATE_ROUTES.ADMIN_USERS);
    };

    const handleNavigateSkills = () => {
        navigate(PRIVATE_ROUTES.ADMIN_SKILLS);
    };
    const handleNavigateSearch = () => {
        navigate(PRIVATE_ROUTES.SEARCH);
    };


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className="card-img">
                <div className="dark-overlay"></div>
                <img src={imgMain} className="img-main" />
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" className="card-home" onClick={handleNavigateUsers}>
                    <h3><PeopleIcon style={{ verticalAlign: 'bottom' }} /> {t('home.manageUsers')}</h3>
                    <p>
                        {t('home.msgManageUsers')}
                    </p>
                    <span className="button-link"><ChevronRightIcon /></span>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" className="card-home" onClick={handleNavigateSearch}>
                    <h3><PlagiarismIcon style={{ verticalAlign: 'bottom' }} /> {t('home.search')}</h3>
                    <p>
                        {t('home.msgSearch')}
                    </p>
                    <span className="button-link"><ChevronRightIcon /></span>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" className="card-home" onClick={handleNavigateSkills}>
                    <h3><AutoAwesomeIcon style={{ verticalAlign: 'bottom' }} /> {t('home.manageSkills')}</h3>
                    <p>
                        {t('home.msgManageSkills')}
                    </p>
                    <span className="button-link"><ChevronRightIcon /></span>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home