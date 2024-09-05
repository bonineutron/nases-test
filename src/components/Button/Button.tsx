import { theme } from '@/utilities/material-ui.utility';
import LoadingButton from '@mui/lab/LoadingButton';
import { ThemeProvider } from '@mui/material';

interface ButtonProps {
   onClick?: () => void;
   children: React.ReactNode;
   submit?: boolean;
   loading?: boolean;
   className?: string;
   secondary?: boolean;
   tertiary?: boolean;
   icon?: JSX.Element;
   disabled?: boolean;
}

export function Button({
   onClick,
   children,
   submit,
   loading,
   className,
   secondary,
   tertiary,
   icon,
   disabled
}: ButtonProps): React.JSX.Element {
   return (
      <div className={`h-fit w-fit ${disabled ? 'cursor-not-allowed' : ''}`}>
         <ThemeProvider theme={theme}>
            <LoadingButton
               type={submit ? 'submit' : 'button'}
               onClick={onClick}
               variant='contained'
               loading={loading}
               disabled={disabled}
               className={`!h-[40px] !text-[16px] !shadow-none !normal-case !rounded-md !border-solid !border-[1px] ${
                  className ?? 'w-fit'
               } ${secondary ? '!bg-secondary-color' : ''} ${
                  tertiary ? '!bg-transparent !text-primary-gray !border-[1px] !border-current' : '!border-transparent'
               }
      `}>
               {icon && <p className='min-w-[20px] text-[20px] mr-1'>{icon}</p>}

               <span>{children}</span>
            </LoadingButton>
         </ThemeProvider>
      </div>
   );
}
