
import { skillAdapter } from "../../adapters/skills/skill.adapter";
import { createSkillDto } from "../../models/dto/skills/createSkill.dto";
import { SkillDto } from "../../models/dto/skills/skill.dto";
import { Skill } from "../../models/skills/skill.model";
import axios from '../../utilities/axios.utility';


export class SkillService {
    public getAllSkills = async (): Promise<Skill[]> => {
        try {
            const response = await axios.get('/skills/getAll');

            const skills: Skill[] = [];
            (response.data as SkillDto[]).map(skill => {
                skills.push(skillAdapter(skill)!);
            })

            return skills;
        }
        catch (error) {
            throw error;
        }
    }

    public createSkill = async (skill: createSkillDto): Promise<Skill | null> => {
        try {
            const response = await axios.post('/skills/create', skill);

            return skillAdapter(response.data as SkillDto);
        }
        catch (error) {
            throw error;
        }
    }

    public deleteSkill = async (skillId: number): Promise<boolean> => {
        try {
            const response = await axios.delete('/skills/deleteById/' + skillId);

            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
}