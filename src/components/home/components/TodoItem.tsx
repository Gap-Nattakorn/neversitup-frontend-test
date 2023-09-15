import { Todo } from '../../../shared/types/todo.type';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface TodoItemProps extends Todo {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

function TodoItem(props: TodoItemProps) {
  const { _id, title, description, onDelete, onEdit } = props;
  return (
    <Card
      sx={{
        minWidth: {
          xs: '100%',
          md: '80%',
          display: 'flex',
          justifyContent: 'space-between',
        },
      }}
    >
      <CardContent
        onClick={() => {
          onEdit(_id);
        }}
        sx={{ flex: 1 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
        </Box>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ pt: '8px', pb: '16px' }}>
        <IconButton
          aria-label='delete'
          onClick={() => {
            onDelete(_id);
          }}
          sx={{ zIndex: 100 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default TodoItem;
