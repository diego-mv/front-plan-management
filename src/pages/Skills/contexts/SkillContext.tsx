import { ReactNode, createContext, useContext, useState } from 'react';
import { Skill } from '../../../models/skills/skill.model';

interface SkillContextProps {
    skills: Skill[];
    chargeSkills: (skills: Skill[]) => void,
    addSkill: (newSkill: Skill) => void;
    removeSkill: (skillId: number) => void;
    children: ReactNode;
}

const SkillContext = createContext<SkillContextProps | undefined>(undefined);

export const SkillProvider: React.FC<SkillContextProps> = ({ children }) => {
    const [skills, setSkills] = useState<Skill[]>([]);

    const chargeSkills = (skills: Skill[]) => {
        setSkills(skills);
    }

    const addSkill = (newSkill: Skill) => {
        setSkills((prevSkills) => [...prevSkills, newSkill]);
    };

    const removeSkill = (skillId: number) => {
        const updatedSkills = skills.filter(q => q.id !== skillId);
        setSkills(updatedSkills);
    }

    const contextValue: SkillContextProps = {
        skills,
        chargeSkills,
        addSkill,
        removeSkill,
        children,
    };

    return (
        <SkillContext.Provider value={contextValue}>
            {children}
        </SkillContext.Provider>
    );
}

export const useSkillContext = (): SkillContextProps => {
    const context = useContext(SkillContext);
    if (!context) {
        throw new Error('useSkillContext debe usarse dentro de SkillProvider');
    }
    return context;
};