import { AccordionDetails, AccordionMaterial, AccordionSummary, theme } from '@/utilities/material-ui.utility';
import { ThemeProvider } from '@mui/material';

interface AccordionProps {
   title: string;
   children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps): JSX.Element {
   return (
      <ThemeProvider theme={theme}>
         <AccordionMaterial>
            <AccordionSummary>
               <p className='font-semibold'>{title}</p>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
         </AccordionMaterial>
      </ThemeProvider>
   );
}
