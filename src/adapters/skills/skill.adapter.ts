import { SkillDto } from "../../models/dto/skills/skill.dto";
import { Skill } from "../../models/skills/skill.model";

export const skillAdapter = (skill: SkillDto | null): Skill | null => {
    if (!skill) return null;
    return {
        id: skill.id,
        name: skill.description,
        iconUrl: skill.url,
        active: skill.active
    }
}