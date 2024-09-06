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
