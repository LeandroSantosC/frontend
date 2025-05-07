import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import { CardResponse } from "../services/CardService";
import { getPublicCards,
        createPublicCard as createPublicAPI,
        updatePublicCard as updatePublicAPI,
        deletePublicCard as deletePublicAPI,
        updateManyCards as updateManyAPI
 } from "../services/AdminService";
import { EditCardData } from "../components/Content/Card/CardEditor";
import { Alert, CircularProgress, Grow, Snackbar, SnackbarCloseReason } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsColorOverrides } from "@mui/material";
import { useAuth } from "./AuthContext";
export type AlertColor = 'success' | 'info' | 'warning' | 'error';


export interface AdminContextType {
    publicCards: CardData[];
    setPublicCards: React.Dispatch<React.SetStateAction<CardData[]>>;
    publicCategories: { id: string, name: string }[];
    createPublicCard: (data: EditCardData) => Promise<CardResponse>;
    deletePublicCard: (id: string) => Promise<CardResponse>;
    updatePublicCard: (id: string, data: EditCardData) => Promise<CardResponse>;
    editPublicCard: { card: CardData, cardRef: React.RefObject<HTMLDivElement> } | null;
    setEditPublicCard: React.Dispatch<React.SetStateAction<{ card: CardData, cardRef: React.RefObject<HTMLDivElement> } | null>>;
    setVisible: (id: string) => void;
    loadingCards: boolean;
    newCard: EditCardData;
    adminSnack: () => void;
    updateManyCards: (data: EditCardData[]) => Promise<CardResponse>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
    const [publicCards, setPublicCards] = useState<CardData[]>([]);
    const [loadingCards, setLoadingCards] = useState(false);
    const [publicCategories, setPublicCategories] = useState<{ id: string, name: string }[]>([]);
    const [editPublicCard, setEditPublicCard] = useState<{ card: CardData, cardRef: React.RefObject<HTMLDivElement> } | null>(null);
    const [openSnack, setOpenSnack] = useState<{ open: boolean, severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined, message?: string }>({ open: false });
    const { user } = useAuth();

    const newCard: EditCardData = {
        id: null,
        name: "",
        image: "",
        sound: null,
        category: {
            id: null,
            name: ""
        }
    }

    const handleCloseSnack = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack({ open: false });
    };

    function adminSnack() {
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
                    icon={loadingCards ? <CircularProgress size={'20px'} /> : false}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {openSnack.message}
                </Alert>
            </Snackbar>
        )
    }

    useEffect(() => {
        if (user?.credentials.role === 'ADMIN') {

            const fetchCards = async () => {
                setLoadingCards(true);
                setOpenSnack({ open: true, severity: 'info', message: "Carregando!" })
                const result = await getPublicCards();
                console.log(result);
                if (result.success) {
                    setLoadingCards(false);
                    setOpenSnack({ open: true, severity: 'success', message: "Carregado com sucesso" });
                    setPublicCards(result.response?.data.sort((a: CardData, b: CardData) => a.position - b.position) || []);
                }
                else {
                    setLoadingCards(false);
                    setOpenSnack({ open: true, severity: 'error', message: "Erro ao carregar " + result.error });
                }
            };

            fetchCards();
        }
    }, []);

    useEffect(() => {
        setPublicCategories(publicCards
            .map((card) => card.category)
            .filter((category) => category.id !== null)
            .filter((category, index, self) => self.findIndex((t) => t.name === category.name) === index) as { id: string; name: string }[]);
    }, [publicCards]);

    const setVisible = (id: string) => {
        setPublicCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id ? { ...card, visible: !card.visible } : card
            )
        );
    };

    const deletePublicCard = async (id: string) => {

        const result = await deletePublicAPI(id);
        if (result.success) {
            setPublicCards((prevCards) => prevCards.filter((card) => card.id !== id));
            setOpenSnack({ open: true, severity: 'success', message: "Card deletado com sucesso!" })
        }
        else {
            setOpenSnack({ open: true, severity: 'error', message: "Não foi possível deletar! tente novamente!" })
        }

        return result;
    };

    const updatePublicCard = async (id: string, data: EditCardData) => {
        const result = await updatePublicAPI(id, data);
        if (result.success) {
            const updatedCard: CardData = result.response?.data;
            setPublicCards((prevCards) => prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
            setOpenSnack({ open: true, severity: 'success', message: "Card atualizado com sucesso!" })
        }
        else {
            setOpenSnack({ open: true, severity: 'error', message: "Não foi possível atualizar! tente novamente!" })
        }

        return result;
    };

    const createPublicCard = async (data: EditCardData) => {
        const result = await createPublicAPI(data);
        if (result.success) {
            const newCard: CardData = result.response?.data;
            setPublicCards((prevCards) => [...prevCards, newCard]);
            setOpenSnack({ open: true, severity: 'success', message: "Card criado com sucesso!" })
        }
        else {
            setOpenSnack({ open: true, severity: 'error', message: "Não foi possível criar! tente novamente!" })
        }
        return result;
    };

    const updateManyCards = async (data: EditCardData[]) => {
        const result = await updateManyAPI(data);
        if (result.success) {
            const newCard: CardData = result.response?.data;
            setPublicCards((prevCards) => [...prevCards, newCard]);
            setOpenSnack({ open: true, severity: 'success', message: "Card criado com sucesso!" })
        }
        else {
            setOpenSnack({ open: true, severity: 'error', message: "Não foi possível criar! tente novamente!" })
        }
        return result;
    };

    return (
        <AdminContext.Provider value={{ publicCards, setPublicCards, publicCategories, createPublicCard, deletePublicCard, updatePublicCard, editPublicCard, setEditPublicCard, setVisible, loadingCards, newCard, adminSnack, updateManyCards }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useCardContext(): AdminContextType {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("AdminContext deve ser usado dentro de um CardProvider");
    }
    return context;
}