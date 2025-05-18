import { createContext, ReactNode, useContext, useState, useEffect, SetStateAction } from "react";
import {  createAuthService } from '../services/AuthService'
import { Alert, Grow, Snackbar, SnackbarCloseReason } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsColorOverrides } from "@mui/material";
import { ApiResponse } from "../services/api/request";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface AuthContextType {
  user: UserData | null;
  login: (data: UserLogin, stay:boolean) => Promise<boolean>;
  logout: () => void
  register: (data: UserRegister) => Promise<boolean>;
  userSnack: () => void;
  setUser: (user: SetStateAction<UserData | null>) => void;
  updateUser: (data: UserData) => Promise<ApiResponse<UserData> | undefined>;
  verifyEmail: (token: string) => Promise<ApiResponse<string>>;
}

export interface UserRegister {
  fullname: string;
  email: string;
  phoneNumber: string;
  gender: "masculino" | "feminino";
  birthDate: string;
  login: string;
  password: string;
}

export interface UserData {
  id?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  gender?: "masculino" | "feminino";
  birthDate?: string;
  voice?: string
  layoutScale?: { card: number, board: number }
  credentials?: { password?:string, login?: string, role?: string }
}

export interface UserLogin {
  login: string;
  password: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [openSnack, setOpenSnack] = useState<{ open: boolean, severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined, message?: string }>({ open: false });
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    if(user?.layoutScale && user && !isSession){
      localStorage.setItem('layout', JSON.stringify(user.layoutScale));
    }
    if(user?.voice && user && !isSession){
      localStorage.setItem('voice', user.voice);
    }
  }, [user?.layoutScale, user?.voice]);

  const handleCloseSnack = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack({ open: false });
  };

  function userSnack() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack.open}
        onClose={handleCloseSnack}
        autoHideDuration={5000}
        slots={{ transition: Grow }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={openSnack.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {openSnack.message}
        </Alert>
      </Snackbar>
    )
  }

  const fetchUser = async () => {
    const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

    if (token) {
      const { getUser } = createAuthService();
      const result = await getUser();
      if (result.success && result.response) {
        setUser(result.response);
        const layout = localStorage.getItem('layout');
        const voice = localStorage.getItem('voice');
        if (layout) {
          const parsedLayout = JSON.parse(layout);
          setUser((prevUser) => ({ ...prevUser, layoutScale: parsedLayout }));
        }
        if (voice) {
          setUser((prevUser) => ({ ...prevUser, voice: voice }));
        }
        setOpenSnack({ open: true, severity: 'success', message: "Bem vindo! " + user?.fullname })
      }
      else {
        localStorage.removeItem('token')
        setOpenSnack({ open: true, severity: 'error', message: "Não foi possível logar! " + result.error })
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //   const deleteUser = async (id: string) => {

  //     const result = await deleteCardAPI(id);
  //     if (result.success) {
  //       setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  //       setOpenSnack({ open: true, success:true, message: "Card deletado com sucesso!" })
  //     }
  //     else {
  //       setOpenSnack({ open: true, success:false, message: "Não foi possível deletar! tente novamente!" })
  //     }

  //     return result;
  //   };

  //   const updateUser = async (id: string, data: EditCardData) => {
  //     const result = await updateCardAPI(id, data);
  //     if (result.success) {
  //       const updatedCard: CardData = result.response?.data;
  //       setCards((prevCards) => prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
  //       setOpenSnack({ open: true, success:true, message: "Card atualizado com sucesso!" })
  //     }
  //     else {
  //       setOpenSnack({ open: true, success:false, message: "Não foi possível atualizar! tente novamente!" })
  //     }

  //     return result;
  //   };

  const register = async (data: UserRegister) => {
    const { register } = createAuthService();
    const result = await register(data);
    return result.success;
  };

  const login = async (data: UserLogin, stay:boolean) => {
    const { login } = createAuthService();
    const result = await login(data);

    if (result.success && result.response) {
      if(stay){
        setIsSession(false);
        localStorage.setItem('token', result.response);
      }
      else{
        setIsSession(true);
        sessionStorage.setItem('token', result.response);
        localStorage.removeItem('token');
      }
      fetchUser();
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: result.error })
    }
    return result.success;
  };

  const logout = async () => {
    const { updateUser } = createAuthService();
    if (user) {
      const result = await updateUser(user)
      if (result.success) {
        setOpenSnack({ open: true, severity: 'success', message: "Até logo, " + user?.fullname })
      }
      else {
        setOpenSnack({ open: true, severity: 'error', message: "Não foi possível salvar alterações " + result.error })
      }
    }
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('voice');
    localStorage.removeItem('layout');
    setUser(null);
  };

  const updateUser = async (data: UserData) => {
    const { updateUser } = createAuthService();
    let result;
    if (user) {
      result = await updateUser(data);
      if (result.success) {
        setOpenSnack({ open: true, severity: 'success', message: "Usuário atualizado com sucesso! " })
        setUser(result.response ?? null);
      }
      else {
        setOpenSnack({ open: true, severity: 'error', message: "Não foi possível salvar alterações " + result.error })
      }
    }
    return result;
  }

  const verifyEmail = async (token: string) => {
    const { verifyEmail } = createAuthService();

    const result = await verifyEmail(token)
    
    return result;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, userSnack, setUser, updateUser, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
}