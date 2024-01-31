import { UserSkillsDto } from "./userSkill.dto";

export class UserDto {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public skills?: UserSkillsDto[]
    ) { }
}