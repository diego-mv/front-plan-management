import { Button } from "@mui/material";
import { FC } from "react";
import ImageProfile from '../../../../assets/profile.svg';
import { User } from "../../../../models/users/user.model";
import './InfoUser.css';

interface Props {
    user: User,
    creating: boolean,
    onCreate: () => void
    onCancelCreate: () => void
}

const InfoUser: FC<Props> = ({ user, creating, onCreate, onCancelCreate }) => {
    return (
        <div className="container-info-user">
            <div className="image-profile">
                <img src={ImageProfile} />
            </div>
            <div className="info-user">
                <h3>{user.name} {user.surname}</h3>
                <h4>{user.email}</h4>
                {
                    !creating
                        ? <Button variant="contained" color="primary" onClick={onCreate}>Agregar habilidad</Button>
                        : <Button variant="contained" color="primary" onClick={onCancelCreate}>Cancelar</Button>
                }
            </div>
        </div>
    )
}

export default InfoUser