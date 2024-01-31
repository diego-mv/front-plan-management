import { UserDto } from "../../models/dto/users/user.dto"
import { User } from "../../models/users/user.model"
import { UserSkill } from "../../models/users/userSkill.model";

export const userAdapter = (user: UserDto | null): User | null => {
    if (!user) return null;

    const userSkills: UserSkill[] = []

    const userModel: User = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email
    }

    if (user.skills && user.skills.length > 0) {
        user.skills.map(skill => {
            userSkills.push({
                id: skill.id,
                description: skill.description,
                learningDate: skill.learningDate,
                level: skill.level,
                url: skill.url
            });
        })
        userModel.skills = userSkills
    }

    return userModel;
}