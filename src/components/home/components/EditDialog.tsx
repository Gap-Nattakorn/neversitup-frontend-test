import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Todo } from '../../../shared/types/todo.type';

interface EditDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: (title: string, description: string) => void;
  todo: Todo | null;
}

type Inputs = {
  title: string;
  description: string;
};

export default function EditDialog(props: EditDialogProps) {
  const { open, setOpen, handleEdit, todo } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      title: todo != null ? todo?.title : '',
      description: todo != null ? todo?.description : '',
    },
  });

  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    handleEdit(data.title, data.description);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
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
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
