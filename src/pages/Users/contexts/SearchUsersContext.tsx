import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, ReactNode, createContext, useContext, useState } from 'react';
import { Skill } from '../../../models/skills/skill.model';

interface SearchUsersContextProps {
    children: ReactNode;
    allSkills: Skill[];
    userData: string;
    skillId: string;
    level: string;
    updateAllSkills: (skills: Skill[]) => void;
    onChangeUserData: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeSkillId: (e: SelectChangeEvent<string>) => void;
    onChangeLevel: (value: string) => void;
    resetValues: () => void
}


const SearchUsersContext = createContext<SearchUsersContextProps | undefined>(undefined);

export const SearchUsersProvider: React.FC<SearchUsersContextProps> = ({ children }) => {
    const [allSkills, setAllSkills] = useState<Skill[]>([]);
    const [userData, setUserData] = useState('');
    const [skillId, setSkillId] = useState('');
    const [level, setLevel] = useState('');

    const onChangeUserData = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(e.target.value);
    }

    const onChangeSkillId = (e: SelectChangeEvent<string>) => {
        setSkillId(e.target.value);
    }

    const updateAllSkills = (skills: Skill[]) => {
        setAllSkills(skills);
    }

    const onChangeLevel = (value: string) => {
        setLevel(value);
    }

    const resetValues = () => {
        setUserData('');
        setSkillId('');
        setLevel('');
    };

    const contextValue: SearchUsersContextProps = {
        children: children,
        allSkills: allSkills,
        userData: userData,
        skillId: skillId,
        level: level,
        updateAllSkills: updateAllSkills,
        onChangeUserData: onChangeUserData,
        onChangeSkillId: onChangeSkillId,
        onChangeLevel: onChangeLevel,
        resetValues: resetValues
    };

    return (
        <SearchUsersContext.Provider value={contextValue} >
            {children}
        </SearchUsersContext.Provider>
    );
}

export const useSearchUsersContext = (): SearchUsersContextProps => {
    const context = useContext(SearchUsersContext);
    if (!context) {
        throw new Error('SearchUsersContext debe usarse dentro de SearchUsersProvider');
    }
    return context;
};