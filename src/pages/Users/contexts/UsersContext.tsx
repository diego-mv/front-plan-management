import { ReactNode, createContext, useContext, useState } from 'react';

interface UsersContextProps {
    children: ReactNode;
    signal: boolean;
    sendSignal: () => void;
}


const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider: React.FC<UsersContextProps> = ({ children }) => {
    const [signal, setSignal] = useState<boolean>(false);

    const sendSignal = () => {
        setSignal(!signal)
    }

    const contextValue: UsersContextProps = {
        children: children,
        signal: signal,
        sendSignal: sendSignal
    };

    return (
        <UsersContext.Provider value={contextValue} >
            {children}
        </UsersContext.Provider>
    );
}

export const useUsersContext = (): UsersContextProps => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsersContext debe usarse dentro de UsersProvider');
    }
    return context;
};