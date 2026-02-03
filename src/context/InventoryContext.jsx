import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
    const [inventory, setInventory] = useState([]);

    const addGrimorio = (grimoire) => {
        setInventory(prev =>
            prev.some(g => g.id === grimoire.id) ? prev : [...prev, grimoire]
        );
    };

    return (
        <InventoryContext.Provider value={{ inventory, addGrimorio }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    return useContext(InventoryContext);
}
