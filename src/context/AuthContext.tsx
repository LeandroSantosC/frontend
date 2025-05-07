import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {  createAuthService } from '../services/AuthService'
import { Alert, Grow, Snackbar, SnackbarCloseReason } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsColorOverrides } from "@mui/material";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface AuthContextType {
  user: UserData | null;
  login: (data: UserLogin) => Promise<boolean>;
  logout: () => void
  register: (data: UserRegister) => void;
  userSnack: () => void;
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
  fullname: string;
  email: string;
  phoneNumber: string;
  gender: "masculino" | "feminino";
  birthDate: string;
  voice?: string
  layoutScale?: number
  credentials: { role: string }
}

export interface UserLogin {
  login: string;
  password: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [openSnack, setOpenSnack] = useState<{ open: boolean, severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined, message?: string }>({ open: false });


  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
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


  function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { getUser } = createAuthService();
      const result = await getUser();
      if (result.success && result.response) {
        setUser(result.response);
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
    await register(data);
  };

  const login = async (data: UserLogin) => {
    const { login } = createAuthService();
    const result = await login(data);

    if (result.success && result.response) {
      localStorage.setItem('token', result.response);
      console.log("acabei de setar o token = " + localStorage.getItem('token'));
      fetchUser();
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: result.error })
    }
    return result.success;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setOpenSnack({ open: true, severity: 'success', message: "Deslogado com sucesso!" })
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, userSnack }}>
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