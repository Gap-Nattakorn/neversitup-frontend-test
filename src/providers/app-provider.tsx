import {
  AppContext,
  AppContextType,
  AppStateType,
} from '../contexts/app-context';
import { ReactNode, useState } from 'react';
import { AlertColor } from '@mui/material/Alert';

const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateType>({
    open: false,
    message: '',
    severity: 'success',
  });

  const onShowSnackBar = async (params: {
    open: boolean;
    severity?: AlertColor;
    message: string;
  }) => {
    setAppState(prevState => ({
      ...prevState,
      ...params,
    }));
  };

  const setOpen = (open: boolean) => {
    setAppState(prevState => ({
      ...prevState,
      open: open,
    }));
  };

  const value: AppContextType = {
    ...appState,
    onShowSnackBar: onShowSnackBar,
    setOpen: setOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
