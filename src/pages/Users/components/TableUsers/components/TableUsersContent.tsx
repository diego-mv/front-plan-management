import DeleteIcon from '@mui/icons-material/Delete';
import RouteIcon from '@mui/icons-material/Route';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { FC } from 'react';
import { User } from '../../../../../models/users/user.model';
import { AppStore } from '../../../../../redux/store';
import { useSelector } from 'react-redux';
import './TableUsersContent.css';

interface Props {
    users: User[],
    page: number,
    rowsPerPage: number,
    totalRows: number,
    handleOpenCareerPlan: (userId: number) => void,
    handleConfirmDelete: (userId: number) => void,
    handleChangePage: (newPage: number) => void,
    handleChangeRowPerPage: (newRows: number) => void,
}

const TableUsersContent: FC<Props> = ({
    users,
    page,
    rowsPerPage,
    totalRows,
    handleOpenCareerPlan,
    handleConfirmDelete,
    handleChangePage,
    handleChangeRowPerPage
}) => {
    const userState = useSelector((store: AppStore) => store.user);

    const isCurrentUser = (email: string): boolean => {
        return email.trim().toLowerCase() === userState.email.trim().toLowerCase();
    }

    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell className='th-skills'>Nombre</TableCell>
                        <TableCell className='th-skills'>Apellido</TableCell>
                        <TableCell className='th-skills'>Email</TableCell>
                        <TableCell className='th-skills' align="right">Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user) => (
                            <TableRow
                                key={user.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.surname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        className='btn-table-users users-path'
                                        onClick={() => handleOpenCareerPlan(user.id)}>
                                        <RouteIcon />
                                    </IconButton>
                                    <IconButton
                                        className='btn-table-users users-delete'
                                        onClick={() => handleConfirmDelete(user.id)}
                                        disabled={isCurrentUser(user.email)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, page) => handleChangePage(page)}
            onRowsPerPageChange={e => handleChangeRowPerPage(parseInt(e.target.value, 10))}
        /></>
    )
}

export default TableUsersContent