import { appConfigurationColors } from '@/utilities/app-configuration.utility';
import { Oval as OvalLibrary } from 'react-loader-spinner';

interface OvalProps {
   size?: number;
}

export function Oval({ size }: OvalProps) {
   return (
      <OvalLibrary
         height={size ?? '24'}
         width={size ?? '24'}
         strokeWidth={6}
         color={appConfigurationColors.primaryColor}
         secondaryColor={appConfigurationColors.primaryGray}
      />
   );
}
