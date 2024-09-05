import { appConfigurationColors } from './src/utilities/app-configuration.utility';
import type { Config } from 'tailwindcss';

const config: Config = {
   content: ['./src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'primary-color': appConfigurationColors.primaryColor,
            'secondary-color': appConfigurationColors.secondaryColor,
            'primary-gray': appConfigurationColors.primaryGray,
            'medium-gray': appConfigurationColors.mediumGray,
            'light-gray': appConfigurationColors.lightGray
         }
      }
   },
   plugins: []
};
export default config;
