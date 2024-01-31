import { Button, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { createUserDto } from "../../../../models/dto/users/createUser.dto";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import './CreateUser.css';
import { UsersService } from "../../../../services/users/users.service";
import { User } from "../../../../models/users/user.model";
import { useUsersContext } from "../../contexts/UsersContext";
import { SnackbarUtilities } from "../../../../utilities";

const initUser: createUserDto = {
  name: '',
  email: '',
  surname: '',
  password: ''
}

interface Props {
  onCreate: () => void
}

const CreateUsers: FC<Props> = ({ onCreate }) => {
  const [loading, setLoading] = useState(false);
  const { sendSignal } = useUsersContext();
  const [createUser, setCreateUser] = useState<createUserDto>(initUser);
  const userService: UsersService = new UsersService();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateUser({ ...createUser, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validateUser()) {
      return;
    }

    setLoading(true);
    try {
      const newUser: User | null = await userService.createUser(createUser);

      if (newUser) {
        SnackbarUtilities.success("Se ha creado al usuario ");
        setLoading(false);
        resetValues();
        sendSignal();
        onCreate();
      }
    }
    catch (error: any) {
      SnackbarUtilities.error('Ha ocurrido un error al intentar crear la habilidad: ' + error.response.data.message);
      setLoading(false);
    }
  };

  const validateUser = (): boolean => {
    if (!createUser.name.trim()) {
      SnackbarUtilities.warning("Debe ingresar un nombre");
      return false;
    }
    if (!createUser.surname.trim()) {
      SnackbarUtilities.warning("Debe ingresar un apellido");
      return false;
    }
    if (!createUser.email.trim()) {
      SnackbarUtilities.warning("Debe ingresar un email");
      return false;
    }
    if (!createUser.email.trim().includes('@')) {
      //TODO: validar correctamente
      SnackbarUtilities.warning("El email debe ser válido");
      return false;
    }
    return true;
  }

  const resetValues = () => {
    setCreateUser(initUser);
  }

  return (
    <div className="container-create-user">
      <LoadingWrapper loading={loading}>
        <TextField
          id='name'
          key='name'
          className="input-create-user"
          required
          label="Nombre"
          onChange={handleInput}
        />
        <TextField
          id='surname'
          key='surname'
          className="input-create-user"
          required
          label="Apellido(s)"
          onChange={handleInput}
        />
        <TextField
          id='email'
          key='email'
          type="email"
          className="input-create-user"
          required
          label="Email"
          onChange={handleInput}
        />
        <Button
          className="btn-create-user"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >Crear</Button>
      </LoadingWrapper>
    </div>
  )
}

export default CreateUsers