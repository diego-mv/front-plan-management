export class TokenInfo {
    constructor(
        public token: string,
        public expiresIn: number,
        public date: Date
    ) {

    }
}