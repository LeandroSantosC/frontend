import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import { createCardService } from "../services/CardService";
import { EditCardData } from "../components/Content/Card/CardEditor";
import { Alert, CircularProgress, Grow, Snackbar, SnackbarCloseReason } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsColorOverrides } from "@mui/material";
import { ApiResponse } from "../services/api/request";
import { useAuth } from "./AuthContext";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface CardContextType {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  categories: {id: string, name: string}[];
  createCard: (data: EditCardData) => Promise<ApiResponse<CardData>>;
  deleteCard: (id: string) => Promise<ApiResponse<string>>;
  updateCard: (id: string, data: EditCardData) => Promise<ApiResponse<CardData>>;
  editCard: {card: CardData, cardRef: React.RefObject<HTMLDivElement>} | null;
  setEditCard: React.Dispatch<React.SetStateAction<{card: CardData, cardRef: React.RefObject<HTMLDivElement>} | null>>;
  setVisible: (id: string) => void;
  loadingCards: boolean;
  newCard:EditCardData;
  CardSnack: () => void;
  setPublicCard: (isPublicCard: boolean) => void
  isPublicCard: boolean;
  layout: number;
  setLayout: React.Dispatch<React.SetStateAction<number>>;
}

export interface NewCard {
  name: string;
  image: string;
  sound: string | null;
  category: {
    name: string;
  };
}
export const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [editCard, setEditCard] = useState<{card: CardData, cardRef: React.RefObject<HTMLDivElement>} | null>(null);
  const [openSnack, setOpenSnack] = useState<{ open: boolean, severity?:OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined , message?: string, noTime?:boolean }>({ open: false });
  const [ isPublicCard, setPublicCard ] = useState(false);
  const { user } = useAuth();

  const newCard:EditCardData = {
    id: undefined,
    name: "",
    image: "",
    sound: undefined,
    category:{
      id: undefined,
      name: ""
    }
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

  function CardSnack(){
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
            icon={loadingCards ? <CircularProgress size={'20px'}/> : false}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {openSnack.message}
          </Alert>
        </Snackbar>
    )
  }

  useEffect(() => {
    const fetchCards = async () => {
      setLoadingCards(true);
      setOpenSnack({open: true, severity:'info', message: "Carregando!", noTime:true})
      const { getCards } = createCardService(isPublicCard);
      const result = await getCards();
      console.log(result);
      if (result.success) {
        setLoadingCards(false);
        setOpenSnack({open: true, severity: 'success' , message: "Carregado com sucesso"});
        setCards(result.response?.sort((a: CardData, b: CardData) => a.position - b.position) || []);
      }
      else{
        setLoadingCards(false);
        setOpenSnack({open: true, severity: 'error' , message: "Erro ao carregar " + result.error});
      }
    };

    fetchCards();
  }, [isPublicCard, user?.fullname]);
  
  useEffect(() => {
      setCategories(cards
        .map((card) => card.category)
        .filter((category) => category.id !== null)
        .filter((category, index, self) => self.findIndex((t) => t.name === category.name) === index) as { id: string; name: string }[]);
  }, [cards]);

  const setVisible = (id: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, visible: !card.visible } : card
      )
    );
  };

  const deleteCard = async (id: string) => {
    const { deleteCard } = createCardService(isPublicCard);
    const result = await deleteCard(id);
    if (result.success) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      setOpenSnack({ open: true, severity: 'success', message: "Card deletado com sucesso!" })
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: "Não foi possível deletar! tente novamente!" })
    }

    return result;
  };

  const updateCard = async (id: string, data: EditCardData) => {
    const { updateCard } = createCardService(isPublicCard);
    const result = await updateCard(id, data);
    if (result.success && result.response) {
      const updatedCard: CardData = result.response;
      setCards((prevCards) => prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
      setOpenSnack({ open: true, severity: 'success', message: "Card atualizado com sucesso!" })
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: "Não foi possível atualizar! tente novamente!" })
    }
    
    return result;
  };

  const createCard = async (data: EditCardData) => {
    const { createCard } = createCardService(isPublicCard);
    const result = await createCard(data);
    if (result.success && result.response) {
      console.log("aqui o card sendo setado nos Cards:" + result.response)
      const newCard: CardData = result.response;
      setCards((prevCards) => [...prevCards, newCard]);
      setOpenSnack({ open: true, severity: 'success', message: "Card criado com sucesso!" })
    }
    else {
      setOpenSnack({ open: true, severity: 'error', message: "Não foi possível criar! tente novamente!" })
    }
    return result;
  };

  return (
    <CardContext.Provider value={{ cards, 
    setCards, 
    categories, 
    createCard, 
    deleteCard, 
    updateCard, 
    editCard, 
    setEditCard, 
    setVisible, 
    loadingCards, 
    newCard, 
    CardSnack, 
    setPublicCard, 
    isPublicCard,}}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext():CardContextType {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("CardContext deve ser usado dentro de um CardProvider");
  }
  return context;
}