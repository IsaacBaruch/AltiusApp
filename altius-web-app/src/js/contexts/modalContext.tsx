import React, { ReactNode, useState } from "react";
import { ModalContext } from "./contexts";

interface MyContextProviderProps {
    children: ReactNode;
  }
  
const ModalContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
    const [value, setValue] = useState<string>('');

    return (
        <ModalContext.Provider value={{ value, setValue }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;