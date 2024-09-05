import {
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   ThemeProvider,
   Select as SelectMaterialUi
} from '@mui/material';
import { validateWidthInputs } from '@/utilities/global.utility';
import { theme } from '@/utilities/material-ui.utility';
import { useEffect, useState } from 'react';
import SelectTest, { StylesConfig, CSSObjectWithLabel, ControlProps } from 'react-select';
import { appConfigurationColors } from '@/utilities/app-configuration.utility';

interface SelectProps {
   label: string;
   value: any;
   options: any;
   onChange: (event: any) => void;
   error?: boolean;
   errorMessage?: string;
   disabled?: boolean;
   fullWidth?: boolean;
   customWidth?: string;
   className?: string;
   outlined?: boolean;
   newSelect?: boolean;
   multiple?: boolean;
}

export function Select({
   label,
   value,
   options,
   onChange,
   error,
   errorMessage,
   disabled,
   fullWidth,
   customWidth,
   className,
   outlined,
   newSelect,
   multiple
}: SelectProps): React.JSX.Element {
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

   if (newSelect) {
      const customStyles: StylesConfig = {
         control: (provided: CSSObjectWithLabel, state: ControlProps) => ({
            ...provided,
            background: 'white',
            display: 'flex',
            flexWrap: 'nowrap',
            width: '100%',
            height: multiple ? '' : '40px',
            borderColor: error ? 'red' : appConfigurationColors.mediumGray,
            boxShadow: state.isFocused ? appConfigurationColors.primaryColor : 'none',
            '&:hover': {
               borderColor: appConfigurationColors.primaryColor
            }
         }),
         menu: (provided: CSSObjectWithLabel) => ({
            ...provided,
            background: 'white',
            width: '100%'
         })
      };

      return (
         <div
            className={`relative min-h-[87px]${className ?? ''}`}
            style={{ width: validateWidthInputs(screenWidth, fullWidth, customWidth) }}>
            <p className='text-[14px] mb-1 text-primary-gray pl-1'>{label}</p>

            <SelectTest
               defaultValue={value}
               options={options}
               placeholder={options.length === 0 ? 'Cargando...' : label}
               onChange={onChange}
               styles={customStyles}
               noOptionsMessage={() => 'Sin resultados'}
               isLoading={options.length === 0 ? true : false}
               isDisabled={disabled}
               isMulti={multiple}
            />

            {error && <p className='text-[12px] mt-1 pl-1 text-red-600'>{errorMessage ?? 'Valor requerido'}</p>}
         </div>
      );
   }

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
                  disabled={disabled}>
                  {options.length > 0 &&
                     options.map((option: any, index: number) => (
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
