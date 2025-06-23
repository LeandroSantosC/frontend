import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import { createCardService } from "../services/CardService";
import CardEditor, { EditCardData } from "../components/Content/Card/CardEditor";
import { useSnackbar } from "notistack";
import { ApiResponse } from "../services/api/request";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface CardContextType {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  categories: string[];
  createCard: (data: EditCardData) => Promise<ApiResponse<CardData>>;
  deleteCard: (id: string) => Promise<ApiResponse<string>>;
  updateCard: (id: string, data: EditCardData) => Promise<ApiResponse<CardData>>;
  setVisible: (id: string) => void;
  loadingCards: boolean;
  newCard:EditCardData;
  setPublicCard: (isPublicCard: boolean) => void
  isPublicCard: boolean;
  setCardEdit: (card: EditCardData, ref: React.RefObject<HTMLDivElement | null>) => void;
  editingCard: EditCardData | null;
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
  const { enqueueSnackbar } = useSnackbar();
  const [loadingCards, setLoadingCards] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [ isPublicCard, setPublicCard ] = useState(false);
  const { user, setUser } = useAuth();

  const newCard:EditCardData = {
    id: undefined,
    name: "",
    image: "",
    sound: undefined,
    category:""
  }


  useEffect(() => {
    const fetchCards = async () => {
      setLoadingCards(true);
      enqueueSnackbar("Carregando!", {variant: "info", persist: true, preventDuplicate: true});
      const { getCards } = createCardService(isPublicCard);
      const result = await getCards();
      console.log(result);
      if (result.success) {
        setLoadingCards(false);
        // closeSnackbar(loading);
        setCards(result.response?.sort((a: CardData, b: CardData) => a.position - b.position) || []);
        setTimeout(() => {
          enqueueSnackbar("Cards carregados com sucesso!", {variant: "success", preventDuplicate: true });
        }, 1500);
      }
      else{
        setLoadingCards(false);
        setTimeout(() => {
        enqueueSnackbar("Erro ao carregar cards - " + result.error, {variant: "error", preventDuplicate: true });
        }, 1500);
      }
    };
    
    fetchCards();
  }, [isPublicCard, user?.id]);
  
  useEffect(() => {
    if(user){
      setUser({...user, cards: cards});
    }

    setCategories(cards
      .map((card) => card.category)
      .filter((category, index, self) => self.findIndex((t) => t === category) === index)
      .sort((a, b) => a.localeCompare(b)) as []);
  }, [cards]);

  useEffect(() => {
    if(user?.credentials?.role === 'ADMIN'){
      return;
    }
    setPublicCard(false);
  }, [user]);

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
      enqueueSnackbar("Cards deletado com sucesso!", {variant: "success", preventDuplicate: true });
    }
    else {
      enqueueSnackbar("Não foi possível deletar! " + result.error, {variant: "error", preventDuplicate: true });
    }

    return result;
  };

  const updateCard = async (id: string, data: EditCardData) => {
    const { updateCard } = createCardService(isPublicCard);
    const result = await updateCard(id, data);
    if (result.success && result.response) {
      const updatedCard: CardData = result.response;
      setCards((prevCards) => prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
      enqueueSnackbar("Card atualizado com sucesso !", {variant: "success", preventDuplicate: true });
    }
    else {
      enqueueSnackbar("Não foi possível atualizar! " + result.error, {variant: "error", preventDuplicate: true });
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
      enqueueSnackbar("Card criado com sucesso! ", {variant: "success", preventDuplicate: true });
    }
    else {
      enqueueSnackbar("Não foi possível criar! " + result.error, {variant: "error", preventDuplicate: true });
    }
    return result;
  };

  const [editingCard, setEditingCard] = useState<EditCardData | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const navigate = useNavigate();

  const setCardEdit = (card: EditCardData, ref?: React.RefObject<HTMLDivElement | null>) => {

    if(user){
      setEditingCard(card);
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setCardRect(rect);
      }
    }
    else{
      navigate("/?login=true");
    }
  };

  return (
    <CardContext.Provider value={{ cards, 
    setCards, 
    categories, 
    createCard, 
    deleteCard, 
    updateCard, 
    setVisible, 
    loadingCards, 
    newCard, 
    setPublicCard, 
    isPublicCard,
    setCardEdit,
    editingCard}}>
      {children}
      <AnimatePresence onExitComplete={() => setEditingCard(null)}>     
      {editingCard && cardRect && <CardEditor card={editingCard} cardRect={cardRect} closeEditor={() => setCardRect(null)}  />}
    </AnimatePresence>
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