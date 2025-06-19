import { createContext, ReactNode, useContext, useState, useEffect, SetStateAction } from "react";
import {  createAuthService } from '../services/AuthService'
import { ApiResponse } from "../services/api/request";
import { useSnackbar } from "notistack";
import { useMediaQuery } from "@mui/material";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface AuthContextType {
  user: UserData | null;
  login: (data: UserLogin) => Promise<boolean>;
  loginGoogle: () => void;
  logout: () => void
  register: (data: UserRegister) => Promise<boolean>;
  setUser: (user: SetStateAction<UserData | null>) => void;
  updateUser: (data: UserData) => Promise<ApiResponse<UserData> | undefined>;
  verifyEmail: (token: string) => Promise<ApiResponse<string>>;
  userLayout: {card:{width: string | undefined, aspectRatio: number} , board: {width: string | undefined}}
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
  rememberMe?: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(user?.voice && user){
      localStorage.setItem('voice', user.voice);
    }
  }, [user?.voice]);

  useEffect(() => {
    if(user?.layoutScale && user){
      localStorage.setItem('layout', JSON.stringify(user.layoutScale));
    }
  }, [user?.layoutScale]);


  const isMobile = useMediaQuery('(max-width:600px)');
  const userLayout = {
    card: {
      width: user?.layoutScale ? `clamp(${240/user.layoutScale.card}px, calc((100% - ${(user.layoutScale.card - 1) * 8}px) / ${user.layoutScale.card}), ${390/user.layoutScale.card}px)` :
      'clamp(80px, calc(33.3% - 4%), 130px)',
      aspectRatio: 1/1.25
    },
    board: {
      width: user?.layoutScale ? `calc((100% - ${(user.layoutScale.board - 1) * 8}px) / ${user.layoutScale.board})` :
      isMobile? '100%' : '50%',
      height: '15vh'
    }
  }

  function cookieExists(name: string) {
  return document.cookie
    .split(';')
    .some(cookie => cookie.trim().startsWith(`${name}=`));
}

  const fetchUser = async () => {

    if(cookieExists('JWT_TOKEN')){
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
        setTimeout(() => {
        enqueueSnackbar("Bem vindo! " + result.response?.fullname, {variant: "success", preventDuplicate: true });
        }, 1500);
      }
      else {
        localStorage.removeItem('token')
        setTimeout(() => {
        enqueueSnackbar("Não foi possível logar! " + result.error, {variant: "error", preventDuplicate: true });
        }, 1500);
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
    if(result.success){
      enqueueSnackbar("Usuário registrado com sucesso", {variant: "success", preventDuplicate: true });
    }else{
      enqueueSnackbar("Não foi possível registrar! " + result.error, {variant: "error", preventDuplicate: true });
    }
    return result.success;
  };

  const login = async (data: UserLogin) => {
    const { login } = createAuthService();
    const result = await login(data);

    if (result.success && result.response) {
      fetchUser();
    }
    else {
      enqueueSnackbar("Não foi possível logar! " + result.error, {variant: "error", preventDuplicate: true });
    }
    return result.success;
  };

  const loginGoogle = () => {
    const { loginGoogle } = createAuthService();
    window.location.href = loginGoogle; // Redireciona para o login do Google
  };

  const logout = async () => {
    const { updateUser, logout } = createAuthService();
    if (user) {
      const result = await updateUser(user)
      if (result.success) {
        enqueueSnackbar("Até logo, " + user?.fullname , {variant: "success", preventDuplicate: true });
      }
      else {
        enqueueSnackbar("Não foi possível salvar alterações " + result.error , {variant: "error", preventDuplicate: true });
      }
      await logout();
    }
    
    setUser(null);
  };

  const updateUser = async (data: UserData) => {
    const { updateUser } = createAuthService();
    let result;
    if (user) {
      result = await updateUser(data);
      if (result.success) {
        enqueueSnackbar("Usuário foi atualizado!" , {variant: "success", preventDuplicate: true });
        setUser(result.response ?? null);
      }
      else {
        enqueueSnackbar("Não foi possível salvar alterações " + result.error , {variant: "error", preventDuplicate: true });
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
    <AuthContext.Provider value={{ user, login, loginGoogle, logout, register, setUser, updateUser, verifyEmail, userLayout }}>
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