import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import CreateDialog from './components/CreateDialog';
import axios from '../../providers/axiosInstance';
import TodoList from './components/TodoList';
import { Todo } from '../../shared/types/todo.type';
import ConfirmDialog from './components/ConfirmDialog';
import EditDialog from './components/EditDialog';
import { useApp } from '../../contexts/app-context';

function Home() {
  const { onShowSnackBar } = useApp();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenCreateDialog = () => {
    setOpenCreate(true);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirm(true);
  };

  const handleOpenEditDialog = () => {
    setOpenEdit(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('/todos')
      .then(res => {
        if (res.status === 200) {
          setTodoList(res.data);
          setLoading(false);
        }
      })
      .catch(error => {
        onShowSnackBar({
          open: true,
          message:
            error instanceof Error
              ? `${error?.message}`
              : 'Someting went wrong!',
          severity: 'error',
        });
      });
  }, []);

  const getTodoList = async () => {
    try {
      const getRes = await axios.get('/todos');

      if (getRes.status === 200) {
        setTodoList(getRes.data);
      }
    } catch (error) {
      onShowSnackBar({
        open: true,
        message:
          error instanceof Error ? `${error?.message}` : 'Someting went wrong!',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deleteRes = await axios.delete(`/todos/${id}`);
      if (deleteRes.status === 200) {
        onShowSnackBar({
          open: true,
          message: 'Delete success',
        });
        await getTodoList();
      }
    } catch (error) {
      onShowSnackBar({
        open: true,
        message:
          error instanceof Error ? `${error?.message}` : 'Someting went wrong!',
        severity: 'error',
      });
    }
  };

  const handleCreate = async (title: string, description: string) => {
    try {
      const createRes = await axios.post('/todos', { title, description });
      if (createRes.status === 200) {
        onShowSnackBar({
          open: true,
          message: 'Create success',
        });
        await getTodoList();
      }
    } catch (error) {
      onShowSnackBar({
        open: true,
        message:
          error instanceof Error ? `${error?.message}` : 'Someting went wrong!',
        severity: 'error',
      });
    }
  };

  const handleEdit = async (title: string, description: string) => {
    try {
      const editRes = await axios.put(`/todos/${todo?._id}`, {
        title,
        description,
      });
      if (editRes.status === 200) {
        onShowSnackBar({
          open: true,
          message: 'Update success',
        });
        await getTodoList();
        setTodo(null);
      }
    } catch (error) {
      onShowSnackBar({
        open: true,
        message:
          error instanceof Error ? `${error?.message}` : 'Someting went wrong!',
        severity: 'error',
      });
    }
  };

  const onConfirm = async () => {
    setOpenConfirm(false);
    if (todo != null) {
      await handleDelete(todo?._id);
    }
    setTodo(null);
  };

  const onDelete = (id: string) => {
    const findTodo = todoList?.find(todo => todo._id === id);

    if (findTodo != null) {
      setTodo(findTodo);
      handleOpenConfirmDialog();
    }
  };

  const onEdit = (id: string) => {
    const findTodo = todoList?.find(todo => todo._id === id);

    if (findTodo != null) {
      setTodo(findTodo);
      handleOpenEditDialog();
    }
  };

  return (
    <>
      <CreateDialog
        open={openCreate}
        setOpen={setOpenCreate}
        handleCreate={handleCreate}
      />
      <ConfirmDialog
        open={openConfirm}
        setOpen={setOpenConfirm}
        todo={todo}
        onConfirm={onConfirm}
      />
      <EditDialog
        open={openEdit}
        setOpen={setOpenEdit}
        handleEdit={handleEdit}
        todo={todo}
      />
      {loading ? null : (
        <Box sx={{ height: '100%' }}>
          <TodoList todoList={todoList} onDelete={onDelete} onEdit={onEdit} />
          <Fab
            color='primary'
            aria-label='add'
            sx={{
              position: 'fixed',
              bottom: '20px',
              right: {
                xs: '45%',
                md: '50%',
              },
              width: '75px',
              height: '75px',
            }}
            onClick={handleOpenCreateDialog}
          >
            <AddIcon fontSize='large' />
          </Fab>
        </Box>
      )}
    </>
  );
}

export default Home;
