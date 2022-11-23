import {useState, FC, ReactElement, createContext} from 'react';


interface StoreContextState {
    username: string;
    setUsername: (username: string) => void;
    songs: string[];
    setSongs: (songs: string[]) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface StoreProviderProps {
    children: ReactElement;
}

const defaultStoreContextValue = {} as StoreContextState;

export const StoreContext = createContext(defaultStoreContextValue);

export const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const [username, setUsername] = useState('');
    const [songs, setSongs] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <StoreContext.Provider value={{username, setUsername, songs, setSongs, isLoggedIn, setIsLoggedIn}}>
            {children}
        </StoreContext.Provider>
    );
}