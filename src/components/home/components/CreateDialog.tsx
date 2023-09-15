import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface CreateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (title: string, description: string) => void;
}

type Inputs = {
  title: string;
  description: string;
};

export default function CreateDialog(props: CreateDialogProps) {
  const { open, setOpen, handleCreate } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    handleCreate(data.title, data.description);
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        aria-label='delete'
        onClick={handleClose}
        sx={{ position: 'absolute', right: '0' }}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ marginTop: '25px' }}>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Title'
            fullWidth
            variant='outlined'
            {...register('title', { required: true })}
            error={!!errors.title}
          />
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            fullWidth
            variant='outlined'
            rows={3}
            multiline
            {...register('description', { required: true })}
            error={!!errors.description}
          />
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
          <Button type='submit' variant='contained'>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
