import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material';
import { useSearchUsersContext } from '../../contexts/SearchUsersContext';
import { FC } from 'react';

interface Props {
    handleSubmit: (e: any) => void
}

const FormSearch: FC<Props> = ({ handleSubmit }) => {
    const { allSkills, userData, skillId, level, onChangeSkillId, onChangeUserData, onChangeLevel, resetValues } = useSearchUsersContext();

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl className="input-field">
                <TextField
                    id="userData"
                    value={userData}
                    onChange={onChangeUserData}
                    label="Buscar por usuario"
                />
            </FormControl>
            <FormControl className="input-field">
                <InputLabel className="label-search">Buscar por habilidad</InputLabel>
                <Select
                    label="Buscar por habilidad"
                    value={skillId}
                    onChange={e => onChangeSkillId(e)}
                >
                    <MenuItem disabled value=''>Selecciona una habilidad</MenuItem>
                    {
                        allSkills.map(skill => (
                            <MenuItem key={skill.id} value={skill.id.toString()}>{skill.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl className="input-field">
                <span className="label-search">Buscar por nivel de habilidad</span>
                <div className="rating-search">
                    <Rating
                        size="large"
                        value={Number(level)}
                        onChange={(_, value) => onChangeLevel(value?.toString() ?? '')}
                    />
                </div>
            </FormControl>
            <Button
                className="button-search"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            ><SearchIcon /> Buscar</Button>
            <Button
                className="button-clear"
                variant="contained"
                color="secondary"
                onClick={resetValues}
            >Limpiar</Button>
        </Box>
    )
}

export default FormSearch