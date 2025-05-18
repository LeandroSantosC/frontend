import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

export interface ToolsContextType {
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    categorySelected: string[];
    setCategorySelected: Dispatch<SetStateAction<string[]>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: ReactNode }) {
    const [editMode, setEditMode] = useState(false);
    const [categorySelected, setCategorySelected] = useState<string[]>([]);
    const [search, setSearch] = useState<string>("");

  return (
    <ToolsContext.Provider value={{ editMode, setEditMode, categorySelected, setCategorySelected, search, setSearch }}>
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