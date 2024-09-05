import {
   FormControl,
   InputLabel,
   SelectChangeEvent,
   ThemeProvider,
   MenuItem,
   FormHelperText,
   Select as SelectMaterialUi
} from '@mui/material';
import { validateWidthInputs } from '@/utilities/global.utility';
import { theme } from '@/utilities/material-ui.utility';
import { useEffect, useState } from 'react';

interface SelectMultipleProps {
   label: string;
   value: string[];
   options: {
      label: string;
      value: string;
   }[];
   onChange: (event: SelectChangeEvent<string[]>) => void;
   error?: boolean;
   errorMessage?: string;
   fullWidth?: boolean;
   customWidth?: string;
   className?: string;
   outlined?: boolean;
}

export function SelectMultiple({
   label,
   value,
   options,
   onChange,
   error,
   errorMessage,
   fullWidth,
   customWidth,
   className,
   outlined
}: SelectMultipleProps): JSX.Element {
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

   return (
      <div
         className={`relative min-h-[72px] ${className ?? ''}`}
         style={{ width: validateWidthInputs(screenWidth, fullWidth, customWidth) }}>
         <ThemeProvider theme={theme}>
            <FormControl error={error} fullWidth variant={outlined ? 'outlined' : 'filled'}>
               <InputLabel size='small'>{options.length === 0 ? 'Cargando...' : label}</InputLabel>

               <SelectMaterialUi
                  value={value}
                  label={label}
                  size='small'
                  onChange={onChange}
                  MenuProps={{
                     PaperProps: {
                        style: {
                           maxHeight: 300,
                           width: 200
                        }
                     }
                  }}
                  multiple={true}
                  renderValue={(selected) => {
                     const filteredArray = options.filter((option) =>
                        selected.some((selectValue) => option.value === selectValue)
                     );

                     const labelArray = filteredArray.map((obj) => obj.label);

                     return labelArray.join(', ');
                  }}>
                  {options.length > 0 &&
                     options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
               </SelectMaterialUi>

               {error && <FormHelperText error>{errorMessage ?? 'Valor requerido'}</FormHelperText>}
            </FormControl>
         </ThemeProvider>
      </div>
   );
}
