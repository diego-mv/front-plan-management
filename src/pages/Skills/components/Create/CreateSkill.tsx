import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import { createSkillDto } from "../../../../models/dto/skills/createSkill.dto";
import { Skill } from "../../../../models/skills/skill.model";
import { SnackbarUtilities } from "../../../../utilities";
import './CreateSkill.css';
import { SkillService } from "../../../../services/skills/skills.service";
import { useSkillContext } from "../../contexts/SkillContext";

const CreateSkill = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const skillService = new SkillService();
  const { addSkill } = useSkillContext();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'name') {
      setName(e.target.value);
    }
    else if (e.target.id === 'url') {
      setUrl(e.target.value);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const create: createSkillDto = {
      url: url,
      description: name
    };

    try {
      const skill: Skill | null = await skillService.createSkill(create);

      if (skill) {
        SnackbarUtilities.success("Se ha creado la habilidad " + skill.name);
        addSkill(skill);
        resetValues();
      }

    }
    catch (error: any) {
      SnackbarUtilities.error('Ha ocurrido un error al intentar crear la habilidad: ' + error.response.data.message);
    }
    setLoading(false);
  }

  const resetValues = () => {
    setName('');
    setUrl('');
  }

  const validateForm = () => {
    if (!name.trim()) {
      SnackbarUtilities.error('Debe ingresar un nombre para la habilidad');
      return false;
    }
    if (!url.trim()) {
      SnackbarUtilities.error('Debe ingresar una url para el icono de la habilidad');
      return false;
    }
    return true;
  }

  return (
    <LoadingWrapper loading={loading}>
      <h2>CREAR HABILIDAD</h2>
      <TextField
        id='name'
        key='name'
        className="input-create-skill"
        required
        label="Nombre"
        onChange={handleInput}
      />
      <TextField
        id="url"
        key='url'
        className="input-create-skill"
        required
        label="Url del icono"
        onChange={handleInput}
      />
      <Button
        className="btn-create-skill"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >Crear</Button>
    </LoadingWrapper>
  )
}

export default CreateSkill