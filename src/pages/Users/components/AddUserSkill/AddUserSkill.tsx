import { Button, MenuItem, Rating, Select } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Skill } from '../../../../models/skills/skill.model'
import { SkillService } from '../../../../services/skills/skills.service'
import { UsersService } from '../../../../services/users/users.service'
import { SnackbarUtilities } from '../../../../utilities'
import './AddUserSkill.css'
import { useCareerPlanUserContext } from '../../contexts/CareerPlanUserContext'

interface Props {
    userId: number
    onClose: () => void
}

const AddUserSkill: FC<Props> = ({ userId, onClose }) => {
    const { reloadUserSkills } = useCareerPlanUserContext();
    const [allSkills, setAllSkills] = useState<Skill[]>([]);
    const [skill, setSkill] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const [learningDate, setLearningDate] = useState<string>('');
    const skillService = new SkillService();
    const userService = new UsersService();

    useEffect(() => {
        const getData = async () => {
            const _skills = await skillService.getAllSkills();

            setAllSkills(_skills);
        };

        getData();
    }, []);

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const created = await userService.addUserSkill(userId, Number(skill), Number(level), new Date(learningDate));
            if (created) {
                SnackbarUtilities.success('¡Habilidad cargada con éxito!');
                reloadUserSkills();
            } else {
                SnackbarUtilities.warning('El usuario ya cuenta con esta habilidad');
            }
            onClose();
        }
        catch (error: any) {
            SnackbarUtilities.warning(error.response.data.message);
            onClose();
        }

    };

    const validateForm = (): boolean => {
        if (!skill) {
            SnackbarUtilities.warning('Debes seleccionar una habilidad');
            return false;
        }
        if (!level) {
            SnackbarUtilities.warning('Debes marcar el nivel del usuario en la habilidad');
            return false;
        }
        if (!learningDate) {
            SnackbarUtilities.warning('Debes seleccionar una fecha de aprendizaje');
            return false;
        }


        return true;
    }

    const handleChangeLevel = (e: any) => {
        setLevel(e.target.value);
    }

    const handleSelectSkill = (e: any) => {
        setSkill(e.target.value);
    }

    const handleChangeDate = (e: any) => {
        setLearningDate(e.target.value);
    }

    return (
        <div className='container-userskill'>
            <h2 className='title-userskill'>Asignar habilidad</h2>
            <span className='label-userskill'>
                Habilidad
            </span>
            <Select
                id='select-userskill'
                className='select-userskill'
                required
                value={skill}
                onChange={handleSelectSkill}
                placeholder='Seleccione una habilidad...'
                displayEmpty
            >
                <MenuItem disabled={true} value='null'>
                    Seleccione una habilidad...
                </MenuItem>
                {
                    allSkills.map(skill => (
                        skill.active
                            ? <MenuItem key={skill.id + skill.name} value={skill.id}>{skill.name}</MenuItem>
                            : <></>
                    ))
                }
            </Select>

            <span className='label-userskill'>
                Califica el seniority del 1 al 5
            </span>
            <Rating
                className='rating-userskill'
                name="simple"
                value={level ? Number(level) : null}
                size="large"
                onChange={handleChangeLevel}
            />

            <span className='label-userskill'>
                Fecha
            </span>
            <input className='date-userskill' type='date' value={learningDate} onChange={handleChangeDate} min='01/01/1960' />
            <Button className='button-userskill' variant='contained' color='primary' onClick={handleSubmit}>Agregar</Button>
        </div>
    )
}

export default AddUserSkill