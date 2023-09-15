import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CustomizedSnackbars from './Snackbar';
import { useApp } from '../../contexts/app-context';

function Layout() {
  const { message, open, severity, setOpen } = useApp();
  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          margin: '0 auto',
          height: '100%',
          paddingY: '16px',
        }}
      >
        <Outlet />
        <CustomizedSnackbars
          message={message}
          open={open}
          severity={severity}
          setOpen={setOpen}
        />
      </Container>
    </>
  );
}

export default Layout;
