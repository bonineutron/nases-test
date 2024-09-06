import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoginCard } from '@/components';
import { useEffect } from 'react';

export function Login(): JSX.Element {
   // Configuration
   const navigate = useNavigate();

   // Redux states
   const { email } = useSelector((state: RootState) => state.user);

   // Effects
   useEffect(() => {
      if (email) {
         navigate('/home');
      }
   }, [email]);

   return (
      <div className='relative h-full w-full'>
         <div className='h-full w-full flex flex-col md:flex-row justify-center md:justify-around gap-6 items-center'>
            <img src='/global/galeria_logo_label.png' alt='logo_label' className='w-[100px] md:w-[250px] h-auto' />

            <LoginCard />
         </div>
      </div>
   );
}
