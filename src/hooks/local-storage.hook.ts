import { objectDecrypt, objectEncrypt } from '../utilities/encrypt-object.utility';

export function useSetLocalStorage<T>(item: string, value: T, ttl?: number) {
   let newValue = {
      ...value
   };

   if (ttl) {
      const now = new Date();

      const ttlInMilliseconds = ttl * 60 * 60 * 1000;

      newValue = {
         ...newValue,
         expiry: now.getTime() + ttlInMilliseconds
      };
   }

   const encryptValue: string | null = objectEncrypt<T>(newValue);

   if (encryptValue) {
      localStorage.setItem(item, encryptValue);
      return;
   }

   console.error('Data could not be encrypted');

   localStorage.setItem(item, JSON.stringify(newValue));
}

export function useGetLocalStorage<T>(item: string): T | null {
   const getItemLocalStorage: string | null = localStorage.getItem(item);

   if (getItemLocalStorage) {
      const now = new Date();

      const decryptValue: any = objectDecrypt<T>(getItemLocalStorage);

      if (decryptValue && decryptValue.expiry) {
         if (now.getTime() > decryptValue.expiry) {
            localStorage.removeItem(item);

            return null;
         }
      }

      if (!decryptValue) {
         const valueLocalStorage: T = JSON.parse(getItemLocalStorage);

         console.error('Data will not be decrypted');
         return valueLocalStorage;
      }

      return decryptValue;
   }

   return null;
}
