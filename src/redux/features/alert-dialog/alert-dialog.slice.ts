import { ETypeAlertDialog } from '@/components/Layout/AlertDialog/AlertDialog.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAlertDialogSlice {
   open?: boolean;
   type: ETypeAlertDialog | null;
   description: string;
}

const initialState: IAlertDialogSlice = {
   open: false,
   type: null,
   description: ''
};

export const alertDialogtSlice = createSlice({
   name: 'alertDialog',
   initialState,
   reducers: {
      openAlert: (state, action: PayloadAction<IAlertDialogSlice>) => {
         const { type, description } = action.payload;
         state.open = true;
         state.type = type;
         state.description = description;
      },

      closeAlert: (state) => {
         state.open = false;
      }
   }
});

export const { openAlert, closeAlert } = alertDialogtSlice.actions;

export default alertDialogtSlice.reducer;
