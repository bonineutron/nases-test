import { FormRegister } from './FormRegister/FormRegister';
import { FormLogin } from './FormLogin/FormLogin';
import { EModeLogin } from './LoginCard.enum';
import { useState } from 'react';

export function LoginCard(): JSX.Element {
   // States
   const [modeCard, setModeCard] = useState<EModeLogin>(EModeLogin.Login);

   // Methods
   const validateStylesByMode = (mode: EModeLogin): string => {
      const generalClasses = 'h-full w-[50%] transition-all';

      if (mode === modeCard) {
         return `${generalClasses} bg-primary-color`;
      }

      if (mode !== modeCard) {
         return `${generalClasses} bg-black/10 hover:bg-black/20`;
      }

      return `${generalClasses}`;
   };

   return (
      <div className='h-fit w-[90%] MD:w-full max-w-[400px] bg-white shadow-md rounded-md overflow-hidden'>
         <div className='h-[44px] w-full flex items-center text-[18px]'>
            <button onClick={() => setModeCard(EModeLogin.Login)} className={validateStylesByMode(EModeLogin.Login)}>
               Ingresar
            </button>

            <button
               onClick={() => setModeCard(EModeLogin.Register)}
               className={validateStylesByMode(EModeLogin.Register)}>
               Registrarse
            </button>
         </div>

         <div className='w-full p-5'>{modeCard === EModeLogin.Login ? <FormLogin /> : <FormRegister />}</div>
      </div>
   );
}
