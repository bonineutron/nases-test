import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISideBarDesktopSlice {
   openSideBarDesktop: boolean;
   isHovered: boolean;
}

const initialState: ISideBarDesktopSlice = {
   openSideBarDesktop: false,
   isHovered: false
};

export const sideBarDesktopSlice = createSlice({
   name: 'sideBarDesktop',
   initialState,
   reducers: {
      setOpenSideBarDesktop: (state, action: PayloadAction<boolean>) => {
         state.openSideBarDesktop = action.payload;
      },
      setIsHovered: (state, action: PayloadAction<boolean>) => {
         state.isHovered = action.payload;
      }
   }
});

export const { setOpenSideBarDesktop, setIsHovered } = sideBarDesktopSlice.actions;

export default sideBarDesktopSlice.reducer;
