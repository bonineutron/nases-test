import sideBarDesktopReducer from './features/side-bar-desktop/side-bar-desktop.slice';
import alertDialogReducer from './features/alert-dialog/alert-dialog.slice';
import userReducer from './features/user/user.slice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
   reducer: {
      user: userReducer,
      sideBarDesktop: sideBarDesktopReducer,
      alertDialog: alertDialogReducer
   }
});

export type RootState = ReturnType<typeof store.getState>;
