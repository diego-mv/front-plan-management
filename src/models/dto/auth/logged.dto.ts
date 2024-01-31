import { UserDto } from "../users/user.dto";

export class LoggedDto {
    constructor(
        public user: UserDto,
        public access_token: string,
        public expiresIn: number
    ) { }
}