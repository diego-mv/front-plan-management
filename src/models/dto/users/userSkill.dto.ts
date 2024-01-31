
export class UserSkillsDto {
    constructor(
        public id: number,
        public active: boolean,
        public url: string,
        public description: string,
        public level: number,
        public learningDate: Date

    ) { }
}
