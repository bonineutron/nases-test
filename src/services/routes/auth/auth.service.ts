import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IResponseGetUserByEmail } from './auth.interface';
import { IResponseApi } from '@/services/api.interface';
import { ETypeAlertDialog } from '@/components';
import apiService from '@/services/api.service';
import { Dispatch } from '@reduxjs/toolkit';

class authService {
   private dispatch: Dispatch | null = null;

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   public async getUserByEmail(email: string): Promise<IResponseGetUserByEmail | null> {
      const tokenApi: string = import.meta.env.VITE_API_TOKEN_USERS;

      const response: IResponseApi<IResponseGetUserByEmail[]> = await apiService.get(
         `/Microservicio-Users/api/Users/usuarios/${email}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer el usuario.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data) {
         return response.data[0];
      }

      return null;
   }
}

export default new authService();
