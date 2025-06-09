import { createContext } from 'react';


interface ModalContextType {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}
export const ModalContext = createContext<ModalContextType | undefined>(undefined);


interface LoginContextType {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoginContext = createContext<LoginContextType | undefined>(undefined);