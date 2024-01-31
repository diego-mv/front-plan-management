import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_ENTITIES } from "../../../models/enums/localstorage.enums";
import { resetTokenLocalStorage, saveTokenLocalStorage } from "../../../services/auth";

const initialValue = localStorage.getItem(LOCALSTORAGE_ENTITIES.token)
    ? localStorage.getItem(LOCALSTORAGE_ENTITIES.token) as string
    : ''

export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialValue,
    reducers: {
        createToken: (state, action) => {
            saveTokenLocalStorage(action.payload);
            return action.payload
        },
        modifyToken: (state, action) => ({ state, ...action.payload }),
        resetToken: () => {
            resetTokenLocalStorage();
            return ''
        }
    }
});

export const { createToken, modifyToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;