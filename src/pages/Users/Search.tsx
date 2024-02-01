import { Grid } from "@mui/material";
import { PRIVATE_ROUTES } from "../../AppRoutes";
import Breadcrumb from "../../components/Breadcrumb";
import { BreadCrumbItem } from "../../models/common/breadcrumbItem.model";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../models/users/user.model";
import { SkillService } from "../../services/skills/skills.service";
import { UsersService } from "../../services/users/users.service";
import { SnackbarUtilities } from "../../utilities";
import './Search.css';
import FormSearch from "./components/FormSearch/FormSearch";
import UserCareer from "./components/ModalUserCareer/ModalUserCareer";
import TableUsersContent from "./components/TableUsers/components/TableUsersContent";
import { CareerPlanUserProvider } from "./contexts/CareerPlanUserContext";
import { useSearchUsersContext } from "./contexts/SearchUsersContext";

const breadItems: BreadCrumbItem[] = [
    {
        label: 'Home',
        url: PRIVATE_ROUTES.HOME
    },
    {
        label: 'Busquedas',
        url: PRIVATE_ROUTES.SEARCH,
        active: true
    },
];

const Search = () => {
    const { userData, skillId, level, updateAllSkills } = useSearchUsersContext();
    const [usersResult, setUsersResult] = useState<User[]>([]);
    const [openCareer, setOpenCareer] = useState(false);
    const [userIdSelected, setUserIdSelected] = useState<number | null>(null);
    const { t } = useTranslation();
    const skillService = new SkillService();
    const userService = new UsersService();

    useEffect(() => {
        const getData = async () => {
            const responseAllSkills = await skillService.getAllSkills();

            updateAllSkills(responseAllSkills);
        };

        getData();
    }, []);

    const handleSubmit = async (e: any) => {
        try {

            if (!userData && !skillId && !level) {
                setUsersResult([]);
                return;
            }

            const _usersResult = await userService.searchUsers(userData, skillId, level);
            setUsersResult(_usersResult);

            SnackbarUtilities.success("La busqueda se ha cargado con exito");
        } catch (error) {
            console.error(error)
            SnackbarUtilities.error("Ha ocurrido un error cargando la búsqueda");
        }
    };

    const handleOpenCareerPlan = (userId: number) => {
        setOpenCareer(true);
        setUserIdSelected(userId);
    };

    const handleCloseCareer = () => {
        setOpenCareer(false);
        setUserIdSelected(null);
    };

    return (
        <div className="container">
            <Breadcrumb items={breadItems} />
            <h2 className="title">{t('advancedSearches')}</h2>

            <div className="content-search">
                <Grid container  >
                    <Grid item xs={4} style={{ marginRight: '3rem' }}>
                        <FormSearch handleSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={7}>
                        <CareerPlanUserProvider signal={new Date()} reloadUserSkills={() => { }} >
                            <UserCareer
                                open={openCareer}
                                handleClose={handleCloseCareer}
                                userId={userIdSelected}
                            />
                        </CareerPlanUserProvider>
                        <TableUsersContent
                            users={usersResult}
                            totalRows={usersResult.length}
                            page={0}
                            rowsPerPage={3}
                            handleOpenCareerPlan={handleOpenCareerPlan}
                            handleChangePage={() => { }}
                            handleChangeRowPerPage={() => { }}
                            handleConfirmDelete={() => { }}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Search