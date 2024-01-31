
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../models/users/user.model';
import { LOCALSTORAGE_ENTITIES } from '../../../models/enums/localstorage.enums';
import { resetUserLocalStorage, saveUserLocalStorage } from '../../../services/auth';

export const UserEmptyState: User = {
  id: 0,
  email: '',
  name: '',
  surname: ''
};

const initialUser = localStorage.getItem(LOCALSTORAGE_ENTITIES.user)
  ? JSON.parse(localStorage.getItem(LOCALSTORAGE_ENTITIES.user) as string)
  : UserEmptyState

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    createUser: (state, action) => {
      saveUserLocalStorage(action.payload);
      return action.payload
    },
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => {
      resetUserLocalStorage();
      return UserEmptyState;
    }
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;