import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC } from 'react';


interface Props {
    show: boolean,
    onClose: () => void,
    onConfirm: () => void,
    text: string
}

const ConfirmDialog: FC<Props> = ({ show, onClose, onConfirm, text }) => {

    const handleConfirm = () => {
        onClose();
        onConfirm();
    };

    return (
        <Dialog
            open={show}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Confirmación
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog