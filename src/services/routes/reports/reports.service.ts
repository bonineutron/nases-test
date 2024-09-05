import {
   IBodyGetReportConsultProjects,
   IBodyGetReportIncomesCosts,
   IResponseGetCecosByState,
   IResponseGetReportConsultProjects,
   IResponseGetReportCostsProjectedMontly,
   IResponseGetReportIncomesCosts
} from './reports.interface';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IResponseApi } from '@/services/api.interface';
import apiService from '@/services/api.service';
import { ETypeAlertDialog } from '@/components';
import { Dispatch } from '@reduxjs/toolkit';

const tokenApi: string = import.meta.env.VITE_API_TOKEN_REPORTS;

const environment: string = import.meta.env.VITE_BUILD_ENV;

const routeProd = 'Microservicio-Reportes';

const routeDev = 'Microservicio-Reportes-Stage';

class reportsService {
   private dispatch: Dispatch | null = null;

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   public async getReportIncomesCosts(
      body: IBodyGetReportIncomesCosts
   ): Promise<IResponseGetReportIncomesCosts[] | null> {
      const response: IResponseApi<IResponseGetReportIncomesCosts[]> = await apiService.post(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/ReportesOperaciones/Ingresos-Costos-Real-Proyectado`,
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
                  description: 'Error al traer el reporte de ingresos y costos.'
               })
            );

            return null;
         }

         if (!response.error && response.data && response.data.length === 0) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Information,
                  description: 'La respuesta no contiene datos.'
               })
            );
         }
      }

      if (!response.error) {
         return response.data;
      }

      return null;
   }

   public async getCecosByState(state: string): Promise<IResponseGetCecosByState[] | null> {
      const response: IResponseApi<IResponseGetCecosByState[]> = await apiService.post(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/ReportesSelectores/Obtener-centro-costos?estado=${state}`,
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
                  description: 'Error al traer la lista de cecos.'
               })
            );

            return null;
         }

         if (!response.error && response.data && response.data.length === 0) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Information,
                  description: 'La respuesta no contiene datos.'
               })
            );
         }
      }

      if (!response.error) {
         return response.data;
      }

      return null;
   }

   public async getReportConsultProjects(
      body: IBodyGetReportConsultProjects
   ): Promise<IResponseGetReportConsultProjects[] | null> {
      const response: IResponseApi<IResponseGetReportConsultProjects[]> = await apiService.post(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/ReportesOperaciones/Contro-Costo-Detallado-Consolidado`,
         { ...body, anno: 0, areaDeNegocio: '' },
         {
            Authorization: `Bearer ${tokenApi}`
         }
      );

      if (this.dispatch) {
         if (response.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al traer el reporte de consulta por proyecto.'
               })
            );

            return null;
         }

         if (!response.error && response.data && response.data.length === 0) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Information,
                  description: 'La respuesta no contiene datos.'
               })
            );
         }
      }

      if (!response.error) {
         return response.data;
      }

      return null;
   }

   public async getReportCostsProjectedMonthly(area: string): Promise<IResponseGetReportCostsProjectedMontly[] | null> {
      const response: IResponseApi<IResponseGetReportCostsProjectedMontly[]> = await apiService.post(
         `/${
            environment === 'production' ? routeProd : routeDev
         }/api/ReportesOperaciones/Costos-reales-y-proyectados?areaDeNegocio=${area}`,
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
                  description: 'Error al traer el reporte de costos proyectados por mes.'
               })
            );

            return null;
         }

         if (!response.error && response.data && response.data.length === 0) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Information,
                  description: 'La respuesta no contiene datos.'
               })
            );
         }
      }

      if (!response.error) {
         return response.data;
      }

      return null;
   }
}

export default new reportsService();
