import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import LoadingWrapper from '../../../../components/LoadingWrapper';
import { SkillService } from '../../../../services/skills/skills.service';
import { SnackbarUtilities } from '../../../../utilities';
import { useSkillContext } from '../../contexts/SkillContext';
import './TableSkill.css';

const TableSkills = () => {
    const [loading, setLoading] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState<number | null>(null);
    const { skills, chargeSkills, removeSkill } = useSkillContext();
    const skillService = new SkillService();

    useEffect(() => {
        const getData = async () => {
            try {
                const allSkills = await skillService.getAllSkills();
                chargeSkills(allSkills);
                setLoading(false);
            }
            catch (error) {
                SnackbarUtilities.error('Ha ocurrido un error al cargar las habilidades');
            }
        }

        getData();
    }, [])

    const handleDelete = async () => {
        if (!skillService) {
            return;
        }
        try {
            const skillDeleted: boolean = await skillService.deleteSkill(skillToDelete!);

            if (skillDeleted) {
                SnackbarUtilities.success('Se ha eliminado la habilidad');
                removeSkill(skillToDelete!);
                setSkillToDelete(null);
            }

        } catch (error: any) {
            SnackbarUtilities.error('Ha ocurrido un error al intentar eliminar la habilidad: ' + error.response.data.message);
        }
    };

    const handleConfirmDelete = (skillId: number) => {
        setSkillToDelete(skillId);
        setConfirmDialog(true);
    };

    const handleCloseConfirm = () => {
        setConfirmDialog(false);
        setSkillToDelete(null);
    };

    return (
        <LoadingWrapper loading={loading}>
            <ConfirmDialog
                show={confirmDialog}
                onClose={handleCloseConfirm}
                onConfirm={handleDelete}
                text='¿Estás seguro/a que deseas eliminar esta habilidad?'
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell className='th-skills'>Nombre</TableCell>
                            <TableCell className='th-skills' align="right">Icono</TableCell>
                            <TableCell className='th-skills' align="right">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            skills.map((skill) => (
                                <TableRow
                                    key={skill.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {skill.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <img className='icon-skill' src={skill.iconUrl} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleConfirmDelete(skill.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </LoadingWrapper>
    )
}

export default TableSkills