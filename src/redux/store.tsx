import { configureStore } from "@reduxjs/toolkit";
import { User } from "../models/users/user.model";
import { userSlice } from "./states/user/user.state";
import { tokenSlice } from "./states/user/token.state";

export interface AppStore {
    user: User;
    token: string;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
        token: tokenSlice.reducer
    }
})

