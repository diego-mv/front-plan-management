import axios from "../../utilities/axios.utility";
import { LoggedDto } from "../../models/dto/auth/logged.dto";
import { LoginDto } from "../../models/dto/auth/login.dto";
import { loadAbort } from "../../utilities";

const baseUrl = 'http://localhost:3000';

export const login = (user: string, pass: string) => {
    const controller = loadAbort();
    const logginDto: LoginDto = {
        user: user,
        password: pass
    };

    return {
        call: axios.post<LoggedDto>(
            '/auth/login',
            logginDto,
            {
                signal: controller.signal
            }),
        controller
    }
}