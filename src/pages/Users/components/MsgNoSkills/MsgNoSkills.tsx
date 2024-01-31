import './MsgNoSkills.css';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const MsgNoSkills = () => {
    return (
        <div className='message-no-skills'>
            <SentimentVeryDissatisfiedIcon fontSize='large' color='secondary'/>
            <h1>¡Ups!</h1>
            <h3>Este usuario no tiene habilidades cargadas</h3>
            <p>¡Empieza a agregar habilidades en el botón de la derecha!</p>
        </div>
    )
}

export default MsgNoSkills