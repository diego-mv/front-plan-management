export class createUserDto {
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string) { }
}