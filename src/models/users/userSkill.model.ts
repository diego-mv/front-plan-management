export class UserSkill {
    constructor(
        public id: number,
        public url: string,
        public description: string,
        public level: number,
        public learningDate: Date
    ) { }
}