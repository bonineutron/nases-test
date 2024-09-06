import { validateWidthInputs } from '@/utilities/global.utility';
import { TextField, ThemeProvider } from '@mui/material';
import { theme } from '@/utilities/material-ui.utility';
import { useEffect, useState } from 'react';

interface InputProps {
   id?: string;
   name?: string;
   type: string;
   label?: string;
   value: string | number;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onBlur?: () => void;
   error?: boolean;
   errorMessage?: string;
   multiline?: boolean;
   fullWidth?: boolean;
   customWidth?: string;
   className?: string;
   disabled?: boolean;
}

export function Input({
   id,
   name,
   type,
   label,
   value,
   onChange,
   onBlur,
   error,
   errorMessage,
   fullWidth,
   multiline,
   customWidth,
   className,
   disabled
}: InputProps): React.JSX.Element {
   // States
   const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

   // Effects
   useEffect(() => {
      const handleResize = () => {
         setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   // Methods
   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();
   };

   return (
      <div
         className={`relative min-h-[70px] ${multiline ? '!min-h-[155px]' : ''} ${className ?? ''}`}
         style={{ width: validateWidthInputs(screenWidth, fullWidth, customWidth) }}>
         <ThemeProvider theme={theme}>
            {type === 'date' && <p className='text-[14px] mb-1 text-primary-gray pl-1'>{label}</p>}

            <TextField
               id={id}
               name={name}
               type={type}
               label={type === 'date' ? undefined : label}
               value={value}
               onChange={onChange}
               onBlur={onBlur}
               error={error}
               helperText={error ? errorMessage ?? 'Valor requerido' : ''}
               variant={'outlined'}
               size='small'
               className='w-full bg-white'
               InputLabelProps={{
                  shrink: type === 'date' ? false : undefined
               }}
               multiline={multiline}
               rows={multiline ? 4 : undefined}
               disabled={disabled ?? false}
               onKeyDown={(event) => handleKeyDown(event)}
               autoComplete={name}
            />
         </ThemeProvider>
      </div>
   );
}
