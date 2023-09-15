import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../contexts/auth-context';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

function Login() {
  const { login, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await login(data.username, data.password);
  };
  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            autoFocus
            {...register('username', {
              required: 'Please input your username!',
            })}
            error={!!errors.username}
            helperText={!!errors.username && errors.username.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            {...register('password', {
              required: 'Please input your Password!',
              minLength: {
                value: 8,
                message: 'Password length must more than 8 characters',
              },
            })}
            error={!!errors.password}
            helperText={!!errors.password && errors.password.message}
          />
          {error && (
            <Typography textAlign='center' sx={{ mt: 2, color: 'red' }}>
              {error}
            </Typography>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
