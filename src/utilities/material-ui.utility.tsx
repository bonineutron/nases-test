import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { appConfigurationColors } from '@/utilities/app-configuration.utility';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AccordionProps, styled, SxProps } from '@mui/material';
import { Theme, createTheme } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import { IoIosArrowForward } from 'react-icons/io';

export const theme: Theme = createTheme({
   palette: {
      primary: {
         main: appConfigurationColors.primaryColor
      },
      secondary: {
         main: appConfigurationColors.secondaryColor
      },
      background: {
         default: '#9FDBFD'
      }
   },
   typography: {
      fontFamily: 'Open Sans, sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700
   }
});

export const AccordionMaterial = styled((props: AccordionProps) => (
   <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
   border: `1px solid ${appConfigurationColors.mediumGray}`,
   borderRadius: '6px',
   boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
   overflow: 'hidden',
   '&::before': {
      display: 'none'
   }
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
   <MuiAccordionSummary expandIcon={<IoIosArrowForward />} {...props} />
))(() => ({
   background: '#A2E0FF',
   padding: '0px 12px',
   color: appConfigurationColors.primaryGray,
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
   }
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
   padding: '12px',
   borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export const stylesTable: SxProps<Theme> = {
   '&.MuiDataGrid-root': {
      background: '#FFFFFF',
      borderRadius: '0px'
   },
   '.MuiDataGrid-columnSeparator': {
      color: '#000000'
   },
   '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus-within':
      {
         outline: 'none'
      }
};
