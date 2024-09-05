import {
   IAccountingAccounts,
   IBodyDeleteAccount,
   IBodyUpdateCostToBeExecuted,
   IBodyUpdateIncomeToBeExecuted,
   ICecosByExecutor,
   IIncomesCostsCeco,
   IResponseGetAccountingAccounts,
   IResponseGetAccountingMonth,
   IResponseGetCostsToBeExecuted,
   IResponseGetDataIndicators,
   IResponseGetIncomeToBeExecuted,
   IResponseGetInfoCeco,
   IResponseIncomesCostsCeco,
   IResponseUpdateCostToBeExecuted
} from './operations.interface';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IResponseApi } from '@/services/api.interface';
import { ETypeAlertDialog } from '@/components';
import apiService from '@/services/api.service';
import { Dispatch } from '@reduxjs/toolkit';

const tokenApi: string = import.meta.env.VITE_API_TOKEN_OPERATIONS;

const environment: string = import.meta.env.VITE_BUILD_ENV;

const routeProd = 'Microservicio-Operaciones';

const routeDev = 'Microservicio-Operaciones-Stage';

class operationsService {
   private dispatch: Dispatch | null = null;

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   public async getAllCecos(): Promise<ICecosByExecutor[] | null> {
      const response: IResponseApi<ICecosByExecutor[]> = await apiService.get(
         `/${environment === 'production' ? routeProd : routeDev}/api/Operaciones/Cecos-Con-Ejecucion-Reciente`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer los cecos.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data && response.data.length > 0) {
         return response.data;
      }

      return null;
   }

   public async getInfoCeco(ceco: string): Promise<IResponseGetInfoCeco | null> {
      const response: IResponseApi<IResponseGetInfoCeco[]> = await apiService.get(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Informacion-Centro-Costo?centro_costo=${ceco}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer la información del ceco.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data && response.data.length > 0) {
         return response.data[0];
      }

      return null;
   }

   public async getIncomesCostsCeco(ceco: string): Promise<IResponseIncomesCostsCeco | null> {
      const response: IResponseApi<IIncomesCostsCeco[]> = await apiService.get(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Ingreso-Y-Costo-Real?centro_costo=${ceco}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer los ingresos y costos reales.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data && response.data.length > 0) {
         const incomes: IIncomesCostsCeco[] = [];
         const costs: IIncomesCostsCeco[] = [];

         response.data.forEach((item) => {
            if (item.tipoCuentaContable === 'INGRESO') {
               incomes.push(item);
            } else if (item.tipoCuentaContable === 'COSTO') {
               costs.push(item);
            }
         });

         return {
            incomes,
            costs
         };
      }

      return null;
   }

   public async getIncomeToBeExecuted(ceco: string, year: number): Promise<IResponseGetIncomeToBeExecuted | null> {
      const response: IResponseApi<IResponseGetIncomeToBeExecuted[]> = await apiService.get(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Ingreso-Por-Ejecutar?centro_costo=${ceco}&anno=${year}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer los ingresos por ejecutar.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data && response.data.length > 0) {
         return response.data[0];
      }

      return null;
   }

   public async getAccountingMonths(year: number): Promise<IResponseGetAccountingMonth[] | null> {
      const response: IResponseApi<IResponseGetAccountingMonth[]> = await apiService.get(
         `/${environment === 'production' ? routeProd : routeDev}/api/Operaciones/Mes-Contable?anno=${year}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer los meses contables.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data && response.data.length > 0) {
         return response.data;
      }

      return null;
   }

   public async updateIncomeToBeExecuted(body: IBodyUpdateIncomeToBeExecuted): Promise<IResponseApi<unknown> | null> {
      const response: IResponseApi<unknown> = await apiService.post(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Crear-Actualizar-Ingresos-Por-Ejecutar`,
         body,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al actualizar los ingresos por ejecutar.'
               })
            );

            return null;
         }
      }

      if (!response.error) {
         return response;
      }

      return null;
   }

   public async getCostsToBeExecuted(ceco: string, year: number): Promise<IResponseGetCostsToBeExecuted[] | null> {
      const response: IResponseApi<IResponseGetCostsToBeExecuted[]> = await apiService.get(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Costo-por-ejecutar?centro_costo=${ceco}&anno=${year}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer los costos por ejecutar.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data && response.data.length > 0) {
         return response.data;
      }

      return null;
   }

   public async getAccountingAccounts(ceco: string): Promise<IAccountingAccounts[] | null> {
      const response: IResponseApi<IResponseGetAccountingAccounts[]> = await apiService.get(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Obtener-cuentas-contables?centro_costo=${ceco}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer las cuentas contables.'
               })
            );

            return null;
         }

         if (!response.error && response.data) {
            if (response.data.length === 0) {
               this.dispatch(
                  openAlert({
                     type: ETypeAlertDialog.Error,
                     description: 'No hay cuentas disponibles, porque no se ha cargado el presupuesto.'
                  })
               );

               return null;
            }

            return response.data[0].cuentasContables.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
         }
      }

      return null;
   }

   public async updateCostToBeExecuted(
      body: IBodyUpdateCostToBeExecuted
   ): Promise<IResponseUpdateCostToBeExecuted[] | null> {
      const response: IResponseApi<IResponseUpdateCostToBeExecuted[]> = await apiService.post(
         `/${environment === 'production' ? routeProd : routeDev}/api/Operaciones/Crear-Actualizar-Costos-Por-Ejecutar`,
         body,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al actualizar el costo por ejecutar.'
               })
            );

            return null;
         }
      }

      if (!response.error && response.data) {
         return response.data;
      }

      return null;
   }

   public async deleteAccount(body: IBodyDeleteAccount): Promise<IResponseApi<unknown> | null> {
      const response: IResponseApi<unknown> = await apiService.delete(
         `/${environment === 'production' ? routeProd : routeDev}/api/Operaciones/Eliminar-Cuenta`,
         body,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al eliminar cuenta.'
               })
            );

            return null;
         }
      }

      if (!response.error) {
         return response;
      }

      return null;
   }

   public async getDataIndicators(ceco: string): Promise<IResponseGetDataIndicators | null> {
      const response: IResponseApi<IResponseGetDataIndicators[]> = await apiService.get(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Resumen-Indicadores?centro_costo=${ceco}`,
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer los indicadores.'
               })
            );

            return null;
         }

         if (!response.error && response.data && response.data.length > 0) {
            return response.data[0];
         }
      }

      return null;
   }

   public async closeAccountingMonth(user: string): Promise<IResponseApi<unknown> | null> {
      const response: IResponseApi<unknown> = await apiService.post(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/Operaciones/Cerrar-mes-contable?usuarioQuecierraMes=${user}`,
         {},
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al cerrar el mes contable.'
               })
            );

            return null;
         }

         if (!response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Success,
                  description: 'Mes contable cerrado con exito.'
               })
            );

            return response;
         }
      }

      return null;
   }
}

export default new operationsService();
