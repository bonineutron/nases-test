import { EPermission } from '@/enums/global.enum';

export const validateWidthInputs = (screenWidth: number, fullWidth?: boolean, customWidth?: string): string => {
   if (customWidth) {
      return customWidth;
   }

   if (fullWidth) {
      return '100%';
   }

   if (screenWidth <= 768) {
      return '100%';
   }

   if (screenWidth <= 1280) {
      return '49%';
   }

   return '32%';
};

export function inputChange<T, K>(setState: React.Dispatch<React.SetStateAction<T>>, key: keyof T, value: K) {
   setState((prevForm: T) => ({
      ...prevForm,
      [key]: {
         value,
         error: false,
         errorMessage: ''
      }
   }));
}

export function inputError<T>(setState: React.Dispatch<React.SetStateAction<T>>, key: keyof T, errorMessage?: string) {
   setState((prevForm: T) => ({
      ...prevForm,
      [key]: {
         ...prevForm[key],
         error: true,
         errorMessage: errorMessage
      }
   }));
}

export function getCurrentYear(): number {
   const currentDate: Date = new Date();

   return currentDate.getFullYear();
}

export function getListYears(): number[] {
   const currentYear = new Date().getFullYear();

   const years = [];

   for (let i = 0; i < 5; i++) {
      years.push(currentYear + i);
   }

   return years;
}

export function formatDateTime(inputDate: string) {
   const date = new Date(inputDate);

   const year = date.getFullYear();

   const month = date.getMonth() + 1;

   const day = date.getDate();

   let hours = date.getHours();

   const minutes = date.getMinutes();

   const isPM = hours >= 12;

   hours = hours % 12 || 12;

   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

   const period = isPM ? 'p.m.' : 'a.m.';

   return `Fecha: ${year}-${month}-${day} ${hours}:${formattedMinutes} ${period}`;
}

export function formatNumberWithCommas(number: number): string {
   let [integerPart, decimalPart] = number.toString().split('.');

   integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   if (!decimalPart) {
      return integerPart;
   }

   decimalPart = decimalPart.substring(0, 2);

   if (decimalPart.length === 0) {
      return integerPart;
   }

   return `${integerPart}.${decimalPart}`;
}

export const validatePermissions = (permissions: string[] | null, permission: EPermission): boolean => {
   if (permissions) {
      const findPermission = permissions.find((item) => item === permission);

      if (findPermission) {
         return false;
      }
   }

   return true;
};

export const generateCustomYearList = (startYear: number, endYear: number) => {
   const years = [];

   for (let year = startYear; year <= endYear; year++) {
      years.push(year);
   }

   return years;
};

export function formatDate(inputDate: string) {
   const [datePart] = inputDate.split('T');

   return datePart;
}
