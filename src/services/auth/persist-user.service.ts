import { TokenInfo } from "../../models/common/token.model";
import { LOCALSTORAGE_ENTITIES } from "../../models/enums/localstorage.enums";
import { User } from "../../models/users/user.model";

export const saveUserLocalStorage = (user: User) => {
    localStorage.setItem(LOCALSTORAGE_ENTITIES.user, JSON.stringify(user));
}

export const resetUserLocalStorage = () => {
    localStorage.removeItem(LOCALSTORAGE_ENTITIES.user);
}

export const saveTokenLocalStorage = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_ENTITIES.token, JSON.stringify(token));
}

export const resetTokenLocalStorage = () => {
    localStorage.removeItem(LOCALSTORAGE_ENTITIES.token);
}

export const getTokenLocalStorage = (): TokenInfo | null => {
    if (!localStorage.getItem(LOCALSTORAGE_ENTITIES.token)) {
        return null
    }

    return JSON.parse(localStorage.getItem(LOCALSTORAGE_ENTITIES.token) as string) as TokenInfo;
}