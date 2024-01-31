export class SkillDto {

    constructor(
        public id: number,
        public description: string,
        public active: boolean,
        public url: string
    ) { }
}