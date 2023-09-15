import { createContext, useContext } from 'react';
import { AlertColor } from '@mui/material/Alert';

export interface AppContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  severity?: AlertColor;
  message: string;
  onShowSnackBar: (params: {
    open: boolean;
    severity?: AlertColor;
    message: string;
  }) => void;
}

export type AppStateType = {
  open: boolean;
  severity?: AlertColor;
  message: string;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => {
  return useContext(AppContext);
};
