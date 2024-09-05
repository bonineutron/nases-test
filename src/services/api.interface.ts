export interface IResponseApi<T> {
   data: T | null;
   error: boolean;
   status?: number;
}
