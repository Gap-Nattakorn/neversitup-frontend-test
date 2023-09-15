import React from 'react';
import { Todo } from '../../../shared/types/todo.type';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TodoItem from './TodoItem';

interface TodoListProps {
  todoList: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

function TodoList(props: TodoListProps) {
  const { todoList, onDelete, onEdit } = props;
  return (
    <Box
      sx={{
        height: '85vh',
        overflow: 'hidden',
        overflowY: 'auto',
        pb: 2,
        px: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {todoList?.length > 0 ? (
          todoList?.map((todo, index) => {
            return (
              <TodoItem
                {...todo}
                key={todo._id}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })
        ) : (
          <Box
            sx={{
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem' }}>
              Empty press '+' for add new todo
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default TodoList;
