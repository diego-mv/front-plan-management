export class CreateUserSkillDto {
    constructor(
        public userId: number,
        public skillId: number,
        public skillLevel: number,
        public learningDate: Date
    ){}
}