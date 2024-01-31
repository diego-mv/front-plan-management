
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import usePagination from '../../../../hooks/usePagination.hook';
import { User } from '../../../../models/users/user.model';
import { UsersService } from "../../../../services/users/users.service";
import { SnackbarUtilities } from "../../../../utilities";
import { CareerPlanUserProvider } from '../../contexts/CareerPlanUserContext';
import { useUsersContext } from "../../contexts/UsersContext";
import UserCareer from '../ModalUserCareer/ModalUserCareer';
import TableUsersContent from "./components/TableUsersContent";



const TableUsers = () => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [userIdSelected, setUserIdSelected] = useState<number | null>(null);
    const [openCareer, setOpenCareer] = useState(false);
    const {
        page,
        rowsPerPage,
        total,
        handleChangePage,
        handleChangeRowPerPage,
        updateTotal } = usePagination({ initSize: 3 });
    const { signal } = useUsersContext();
    const userService = new UsersService();

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const responseAllUsers = await userService.getAllUsers(page, rowsPerPage);
                updateTotal(responseAllUsers.total);
                setUsers(responseAllUsers.data);

                setLoading(false);
            }
            catch (error) {
                SnackbarUtilities.error('Ha ocurrido un error al cargar las habilidades');
            }
        }

        getData();
    }, [signal, page, rowsPerPage])

    const handleConfirmDelete = (skillId: number) => {
        setUserToDelete(skillId);
        setConfirmDialog(true);
    };

    const handleCloseConfirm = () => {
        setConfirmDialog(false);
        setUserToDelete(null);
    };

    const handleDelete = async () => {
        if (!userService) {
            return;
        }
        try {
            const userDeleted: boolean = await userService.deleteUser(userToDelete!);

            if (userDeleted) {
                SnackbarUtilities.success('El usuario ha sido eliminado');
                removeUsers(userToDelete!);
                setUserToDelete(null);
            }

        } catch (error: any) {
            SnackbarUtilities.error('Ha ocurrido un error al intentar eliminar el usuario: ' + error.response.data.message);
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
        <LoadingWrapper loading={loading}>
            <ConfirmDialog
                show={confirmDialog}
                onClose={handleCloseConfirm}
                onConfirm={handleDelete}
                text='¿Estás seguro/a que deseas eliminar este usuario?'
            />
            <CareerPlanUserProvider signal={new Date()} reloadUserSkills={() => { }} >
                <UserCareer
                    open={openCareer}
                    handleClose={handleCloseCareer}
                    userId={userIdSelected}
                />
            </CareerPlanUserProvider>
            <TableUsersContent
                users={users}
                page={page}
                rowsPerPage={rowsPerPage}
                totalRows={total}
                handleChangePage={handleChangePage}
                handleChangeRowPerPage={handleChangeRowPerPage}
                handleConfirmDelete={handleConfirmDelete}
                handleOpenCareerPlan={handleOpenCareerPlan}
            />
        </LoadingWrapper>
    )
}

export default TableUsers