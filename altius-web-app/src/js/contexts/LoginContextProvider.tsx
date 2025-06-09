import React, { ReactNode, useState } from "react";
import { LoginContext } from "./contexts";

interface LoginContextProviderProps {
    children: ReactNode;
}
  
const LoginContextProvider: React.FC<LoginContextProviderProps> = ({ children }) => {
    const [value, setValue] = useState<boolean>(false);

    return (
        <LoginContext.Provider value={{ value, setValue }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;