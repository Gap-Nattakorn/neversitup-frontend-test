import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { Todo } from '../../../shared/types/todo.type';

interface ConfirmDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  todo: Todo | null;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { open, setOpen, onConfirm, todo } = props;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <DialogContentText
          sx={{ fontSize: '20px' }}
        >{`Want delete ${todo?.title} ?`}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <Button onClick={handleClose} variant='contained'>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
