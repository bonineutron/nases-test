import { ETypeAlertDialog } from '@/components/Layout/AlertDialog/AlertDialog.enum';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IResponseApi } from './api.interface';
import axios, { AxiosResponse } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_URL
});

class apiService {
   private defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   };

   private dispatch: Dispatch | null = null;

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   private initInterceptor(): void {
      axiosInstance.interceptors.request.use(
         (config) => {
            // const tokenApi: string = import.meta.env.VITE_API_TOKEN_USERS;

            // if (tokenApi) {
            //    config.headers['Authorization'] = `Bearer ${tokenApi}`;
            // }

            return config;
         },

         (error) => {
            return Promise.reject(error);
         }
      );

      axiosInstance.interceptors.response.use(
         (response) => {
            return response;
         },

         (error) => {
            if (this.dispatch) {
               if (error.response.status === 500) {
                  this.dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Error en servidor.' }));
               }
            }

            return Promise.reject(error);
         }
      );
   }

   constructor() {
      this.initInterceptor();
   }

   public async get<T>(url: string, customHeaders?: Record<string, string>): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.get(url, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: any) {
         if (error.response) {
            return { data: null, error: true, status: error.response.status };
         }

         return { data: null, error: true };
      }
   }

   public async post<T>(
      url: string,
      body?: Record<any, any>,
      customHeaders?: Record<string, string>
   ): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.post(url, body, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: any) {
         if (error.response) {
            return { data: null, error: true, status: error.response.status };
         }

         return { data: null, error: true };
      }
   }

   public async put<T>(
      url: string,
      body?: Record<any, any>,
      customHeaders?: Record<string, string>
   ): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.put(url, body, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: any) {
         if (error.response) {
            return { data: null, error: true, status: error.response.status };
         }

         return { data: null, error: true };
      }
   }

   public async patch<T>(
      url: string,
      body?: Record<any, any>,
      customHeaders?: Record<string, string>
   ): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.patch(url, body, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: any) {
         if (error.response) {
            return { data: null, error: true, status: error.response.status };
         }

         return { data: null, error: true };
      }
   }

   public async delete<T>(
      url: string,
      body?: Record<any, any>,
      customHeaders?: Record<string, string>
   ): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.delete(url, {
            data: body,
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: any) {
         if (error.response) {
            return { data: null, error: true, status: error.response.status };
         }

         return { data: null, error: true };
      }
   }
}

export default new apiService();
