import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useGetLocalStorage } from '@/hooks';
import { IUserApp } from './user.interface';

const userLocalStorage: IUserApp | null = useGetLocalStorage<IUserApp>('user');

const userVoid: IUserApp = {
   accessToken: '',
   email: '',
   picture: ''
};

const initialState: IUserApp = userLocalStorage ?? userVoid;

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateUser: (state, action: PayloadAction<IUserApp>) => {
         state.accessToken = action.payload.accessToken;
         state.email = action.payload.email;
         state.picture = action.payload.picture;
      },
      removeUser: (state) => {
         state.accessToken = '';
         state.email = '';
         state.picture = '';
      }
   }
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
