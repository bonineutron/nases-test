import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { theme } from '@/utilities/material-ui.utility';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';

interface InputPasswordProps {
   value: string;
   label?: string;
   id?: string;
   onChange: React.ChangeEventHandler<HTMLInputElement>;
   error?: boolean;
   errorMessage?: string;
}

export function InputPassword({
   value,
   label,
   id,
   onChange,
   error,
   errorMessage
}: InputPasswordProps): React.JSX.Element {
   // States
   const [showPassword, setShowPassword] = useState(false);

   return (
      <div className='relative w-full h-[70px]'>
         <ThemeProvider theme={theme}>
            <FormControl variant='outlined' error={error} fullWidth>
               <InputLabel size='small' htmlFor='outlined-adornment-password'>
                  {label ?? 'Contraseña'}
               </InputLabel>

               <OutlinedInput
                  id={id ?? 'galeria-password'}
                  name={id ?? 'galeria-password'}
                  type={showPassword ? 'text' : 'password'}
                  label={label ?? 'Contraseña'}
                  value={value}
                  onChange={onChange}
                  fullWidth
                  endAdornment={
                     <InputAdornment position='end'>
                        <IconButton
                           edge='end'
                           aria-label='toggle password visibility'
                           onClick={() => setShowPassword((show: boolean) => !show)}
                           onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                              event.preventDefault();
                           }}>
                           {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                     </InputAdornment>
                  }
                  autoComplete='new-password'
                  size='small'
               />

               {error && (
                  <FormHelperText error id='password-error' className='pt-[1px]'>
                     {errorMessage ?? 'Contraseña requerida'}
                  </FormHelperText>
               )}
            </FormControl>
         </ThemeProvider>
      </div>
   );
}
