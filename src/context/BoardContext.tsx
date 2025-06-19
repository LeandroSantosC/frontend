import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { createBoardService } from "../services/BoardService";
import { ApiResponse } from "../services/api/request";
import { useAuth } from "./AuthContext";
import { BoardData, NewBoardData } from "../components/Content/Board/Board";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BoardEditor from "../components/Content/Board/BoardEditor";
import { useSnackbar } from "notistack";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface BoardContextType {
  boards: BoardData[];
  setBoards: React.Dispatch<React.SetStateAction<BoardData[]>>;
  createBoard: (data: NewBoardData) => Promise<ApiResponse<BoardData>>;
  deleteBoard: (id: string) => Promise<ApiResponse<string>>;
  updateBoard: (id: string, data: NewBoardData) => Promise<ApiResponse<BoardData>>;
  setVisible: (id: string) => void;
  loadingBoards: boolean;
  newBoard:NewBoardData;
  setBoardEdit: (board: NewBoardData, ref: React.RefObject<HTMLDivElement | null>) => void;
  editingBoard: NewBoardData | null;
}

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loadingBoards, setLoadingBoards] = useState(false);
  const { user, setUser } = useAuth();

  const newBoard:NewBoardData = {
    name: "",
    button: []
  }


  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingBoards(true);
      enqueueSnackbar("Carregando!", {variant: "info", persist: true, preventDuplicate: true});
      const { getBoards } = createBoardService();
      const result = await getBoards();
      console.log(result);
      if (result.success) {
        setLoadingBoards(false);
        setTimeout(() => {
        enqueueSnackbar("Pranchas carregadas com sucesso!", {variant: "success", preventDuplicate: true});
        }, 1500);
        setBoards(result.response?.sort((a: BoardData, b: BoardData) => a.position - b.position) || []);
      }
      else{
        setLoadingBoards(false);
        setTimeout(() => {
        if(user){enqueueSnackbar("Erro ao carregar pranchas! " + result.error, {variant: "error", preventDuplicate: true })};
        }, 1500);
      }
    };

    fetchBoards();
  }, [user?.id]);

  useEffect(() => {
    if(user){
      setUser({...user, boards: boards});
    }
  }, [boards]);
  

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
      enqueueSnackbar("Prancha deletada!", {variant: "success", preventDuplicate: true });
    }
    else {
      enqueueSnackbar("Não foi possível deletar! " + result.error, {variant: "error", preventDuplicate: true });
    }

    return result;
  };

  const updateBoard = async (id: string, data: NewBoardData) => {
    const { updateBoard } = createBoardService();
    const result = await updateBoard(id, data);
    if (result.success && result.response) {
      const updatedBoard: BoardData = result.response;
      setBoards((prevBoards) => prevBoards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board)));
      enqueueSnackbar("Prancha atualizada com sucesso", {variant: "success", preventDuplicate: true });
    }
    else {
      enqueueSnackbar("Não foi possível atualizar! " + result.error, {variant: "error", preventDuplicate: true });
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
      enqueueSnackbar("Prancha criada!", {variant: "success", preventDuplicate: true });
    }
    else {
      enqueueSnackbar("Não foi possível criar! " + result.error, {variant: "error", preventDuplicate: true });
    }
    return result;
  };

  const [editingBoard, setEditingBoard] = useState<NewBoardData | null>(null);
  const [boardRect, setBoardRect] = useState<DOMRect | null>(null);
  const navigate = useNavigate();

  const setBoardEdit = (board: NewBoardData, ref: React.RefObject<HTMLDivElement | null>) => {
    if(user){
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setEditingBoard(board);
        setBoardRect(rect);
      }
    }
    else{
      navigate("/?login=true");
    }
  };


  return (
    <BoardContext.Provider value={{ boards, 
    setBoards, 
    createBoard, 
    deleteBoard, 
    updateBoard, 
    setVisible, 
    loadingBoards, 
    newBoard,
    setBoardEdit,
    editingBoard
    }}>
      {children}
      <AnimatePresence onExitComplete={() => setEditingBoard(null)}>
        {editingBoard && boardRect && (
          <BoardEditor
          board={editingBoard}
          boardRect={boardRect}
          closeEditor={() => setBoardRect(null)}
          />
        )}
      </AnimatePresence>
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