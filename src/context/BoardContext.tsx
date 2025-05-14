import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { createBoardService } from "../services/BoardService";
import { Alert, CircularProgress, Grow, Snackbar, SnackbarCloseReason } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsColorOverrides } from "@mui/material";
import { ApiResponse } from "../services/api/request";
import { useAuth } from "./AuthContext";
import { BoardData, NewBoardData } from "../components/Content/Board/Board";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface BoardContextType {
  boards: BoardData[];
  setBoards: React.Dispatch<React.SetStateAction<BoardData[]>>;
  createBoard: (data: NewBoardData) => Promise<ApiResponse<BoardData>>;
  deleteBoard: (id: string) => Promise<ApiResponse<string>>;
  updateBoard: (id: string, data: BoardData) => Promise<ApiResponse<BoardData>>;
  editBoard: {board: BoardData, boardRef: React.RefObject<HTMLDivElement>} | null;
  setEditBoard: React.Dispatch<React.SetStateAction<{board: BoardData, boardRef: React.RefObject<HTMLDivElement>} | null>>;
  setVisible: (id: string) => void;
  loadingBoards: boolean;
  newBoard:NewBoardData;
  BoardSnack: () => void;
}

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [loadingBoards, setLoadingBoards] = useState(false);
  const [editBoard, setEditBoard] = useState<{board: BoardData, boardRef: React.RefObject<HTMLDivElement>} | null>(null);
  const [openSnack, setOpenSnack] = useState<{ open: boolean, severity?:OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined , message?: string, noTime?:boolean }>({ open: false });
  const { user } = useAuth();

  const newBoard:NewBoardData = {
    name: "",
    cards: []
  }

  const handleCloseSnack = (
      _event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnack({ open: false });
    };

  function BoardSnack(){
    return (
      <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnack.open}
          onClose={handleCloseSnack}
          autoHideDuration={openSnack.noTime ? null : 5000}
          slots={{ transition: Grow }}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={openSnack.severity}
            icon={loadingBoards ? <CircularProgress size={'20px'}/> : false}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {openSnack.message}
          </Alert>
        </Snackbar>
    )
  }

  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingBoards(true);
      setOpenSnack({open: true, severity:'info', message: "Carregando!", noTime:true})
      const { getBoards } = createBoardService();
      const result = await getBoards();
      console.log(result);
      if (result.success) {
        setLoadingBoards(false);
        setOpenSnack({open: true, severity: 'success' , message: "Carregado com sucesso"});
        setBoards(result.response?.sort((a: BoardData, b: BoardData) => a.position - b.position) || []);
      }
      else{
        setLoadingBoards(false);
        setOpenSnack({open: true, severity: 'error' , message: "Erro ao carregar " + result.error});
      }
    };

    fetchBoards();
  }, [user?.fullname]);
  

  const setVisible = (id: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, visible: !board.visible } : board
      )
    );
  };

  const deleteBoard = async (id: string) => {
    const { deleteBoard } = createBoardService();
    const result = await deleteBoard(id);
    if (result.success) {
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
      setOpenSnack({ open: true, severity: 'success', message: "Board deletado com sucesso!" })
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: "Não foi possível deletar! tente novamente!" })
    }

    return result;
  };

  const updateBoard = async (id: string, data: NewBoardData) => {
    const { updateBoard } = createBoardService();
    const result = await updateBoard(id, data);
    if (result.success && result.response) {
      const updatedBoard: BoardData = result.response;
      setBoards((prevBoards) => prevBoards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board)));
      setOpenSnack({ open: true, severity: 'success', message: "Board atualizado com sucesso!" })
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: "Não foi possível atualizar! tente novamente!" })
    }
    
    return result;
  };

  const createBoard = async (data: NewBoardData) => {
    const { createBoard } = createBoardService();
    const result = await createBoard(data);
    if (result.success && result.response) {
      console.log("aqui o Board sendo setado nos Boards:" + result.response)
      const newBoard: BoardData = result.response;
      setBoards((prevBoards) => [...prevBoards, newBoard]);
      setOpenSnack({ open: true, severity: 'success', message: "Board criado com sucesso!" })
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: "Não foi possível criar! tente novamente!" })
    }
    return result;
  };

  return (
    <BoardContext.Provider value={{ boards, 
    setBoards, 
    createBoard, 
    deleteBoard, 
    updateBoard, 
    editBoard, 
    setEditBoard, 
    setVisible, 
    loadingBoards, 
    newBoard, 
    BoardSnack, 
    }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext():BoardContextType {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("BoardContext deve ser usado dentro de um BoardProvider");
  }
  return context;
}