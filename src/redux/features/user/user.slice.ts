import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useGetLocalStorage } from '@/hooks';
import { IUserApp } from './user.interface';

const userLocalStorage: IUserApp | null = useGetLocalStorage<IUserApp>('user');

const userVoid: IUserApp = {
   accessToken: '',
   email: '',
   emailVerified: null,
   familyName: '',
   givenName: '',
   hd: '',
   name: '',
   picture: '',
   sub: '',
   permissions: null
};

const initialState: IUserApp = userLocalStorage ?? userVoid;

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateUser: (state, action: PayloadAction<IUserApp>) => {
         state.accessToken = action.payload.accessToken;
         state.email = action.payload.email;
         state.emailVerified = action.payload.emailVerified;
         state.familyName = action.payload.familyName;
         state.givenName = action.payload.givenName;
         state.hd = action.payload.hd;
         state.name = action.payload.name;
         state.picture = action.payload.picture;
         state.sub = action.payload.sub;
         state.permissions = action.payload.permissions;
      },
      removeUser: (state) => {
         state.accessToken = '';
         state.email = '';
         state.emailVerified = null;
         state.familyName = '';
         state.givenName = '';
         state.hd = '';
         state.name = '';
         state.picture = '';
         state.sub = '';
         state.permissions = null;
      }
   }
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
