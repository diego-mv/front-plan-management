import { ReactNode, createContext, useContext, useState } from 'react';

interface CareerPlanUserContextProps {
    signal: Date,
    reloadUserSkills: () => void;
    children: ReactNode;
}

const CareerPlanUserContext = createContext<CareerPlanUserContextProps | undefined>(undefined);

export const CareerPlanUserProvider: React.FC<CareerPlanUserContextProps> = ({ children }) => {
    const [signal, setSignal] = useState<Date>(new Date());

    const reloadUserSkills = () => {
        setSignal(new Date());
    }

    const contextValue: CareerPlanUserContextProps = {
        signal,
        reloadUserSkills,
        children,
    };

    return (
        <CareerPlanUserContext.Provider value={contextValue} >
            {children}
        </CareerPlanUserContext.Provider>
    );
}

export const useCareerPlanUserContext = (): CareerPlanUserContextProps => {
    const context = useContext(CareerPlanUserContext);
    if (!context) {
        throw new Error('useCareerPlanUserContext debe usarse dentro de CareerPlanUserProvider');
    }
    return context;
};