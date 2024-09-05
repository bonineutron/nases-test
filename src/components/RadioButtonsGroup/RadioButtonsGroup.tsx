import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ThemeProvider } from '@mui/material';
import { theme } from '@/utilities/material-ui.utility';

interface RadioButtonsGroupProps {
   label: string;
   value: number;
   setValue: React.Dispatch<React.SetStateAction<number>>;
   options: {
      value: number;
      label: string;
   }[];
}

export function RadioButtonsGroup({ label, value, setValue, options }: RadioButtonsGroupProps): JSX.Element {
   // Methods
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number((event.target as HTMLInputElement).value));
   };

   return (
      <ThemeProvider theme={theme}>
         <FormControl className='text-primary-gray'>
            <FormLabel className='!text-[16px]'>{label}</FormLabel>

            <RadioGroup value={value} onChange={handleChange}>
               {options.map((option, index) => (
                  <FormControlLabel
                     key={index}
                     value={option.value}
                     control={<Radio size='small' />}
                     label={option.label}
                  />
               ))}
            </RadioGroup>
         </FormControl>
      </ThemeProvider>
   );
}
