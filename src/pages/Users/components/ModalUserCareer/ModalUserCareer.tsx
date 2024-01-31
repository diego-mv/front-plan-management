import { FC, useEffect, useState } from "react";
import { User } from "../../../../models/users/user.model";
import { UsersService } from "../../../../services/users/users.service";
import CareerPlan from "../CareerPlan/CareerPlan";
import { Dialog, DialogTitle, Grid } from "@mui/material";
import './ModalUserCareer.css';
import InfoUser from "../InfoUser/InfoUser";
import MsgNoSkills from "../MsgNoSkills/MsgNoSkills";
import AddUserSkill from "../AddUserSkill/AddUserSkill";
import { CareerPlanUserProvider, useCareerPlanUserContext } from "../../contexts/CareerPlanUserContext";

interface Props {
    userId: number | null,
    open: boolean,
    handleClose: () => void
}

const initUser: User = {
    id: 0,
    email: '',
    name: '',
    surname: '',
    skills: undefined
};
const UserCareer: FC<Props> = ({ open, handleClose, userId }) => {
    const { signal } = useCareerPlanUserContext();
    const [userData, setUserData] = useState<User>(initUser);
    const [assignSkill, setAssignSkill] = useState(false);

    const userService = new UsersService();

    useEffect(() => {
        const getDate = async () => {
            if (userId) {
                const user = await userService.getUserWithSkills(userId);

                if (user) {
                    setUserData(user);
                }
                else {
                    setUserData(initUser)
                }
            }
        };

        getDate();
    }, [userId, signal]);

    const handleClickAddSkill = () => {
        setAssignSkill(true);
    };

    const handleCloseAddSkill = () => {
        setAssignSkill(false);
    }

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={'lg'}>
            <DialogTitle>Carrera del usuario</DialogTitle>
            <Grid container spacing={6} className="container-user-career">
                <Grid item xs={6}>
                    {
                        assignSkill
                            ? <AddUserSkill userId={userId!} onClose={handleCloseAddSkill} />
                            : <>{
                                userData && userData.skills && userData.skills.length > 0
                                    ? <CareerPlan skills={userData ? userData.skills : []} />
                                    : <MsgNoSkills />
                            }</>

                    }
                </Grid>
                <Grid item xs={6}>
                    <InfoUser
                        user={userData}
                        creating={assignSkill}
                        onCreate={handleClickAddSkill}
                        onCancelCreate={handleCloseAddSkill} />
                </Grid>
            </Grid>

        </Dialog>
    )
}

export default UserCareer