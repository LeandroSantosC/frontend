import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

export interface ToolsContextType {
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: ReactNode }) {
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState<string>("Tudo");
    const [search, setSearch] = useState<string>("");

  return (
    <ToolsContext.Provider value={{ editMode, setEditMode, category, setCategory, search, setSearch }}>
      {children}
    </ToolsContext.Provider>
  );
}

export function useToolsContext():ToolsContextType {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error("useToolsContext deve ser usado dentro de um ToolsProvider");
  }
  return context;
}