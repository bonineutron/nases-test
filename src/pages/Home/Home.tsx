import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function Home(): JSX.Element {
   // Configuration
   const navigate = useNavigate();

   // Redux states
   const { name } = useSelector((state: RootState) => state.user);

   // Effects
   useEffect(() => {
      if (!name) {
         navigate('/login');
      }
   }, [name]);

   return (
      <div className='relative h-full w-full overflow-hidden'>
         <img src='/photographs/home-picture.jpg' alt='home-picture' className='h-full w-full object-cover' />

         <div className='absolute top-[10px] left-[10px] w-full max-w-[320px] bg-white p-3 rounded-md shadow-md md:max-w-[500px] md:top-[30px] md:left-[30px]'>
            <div className='flex flex-col items-start gap-1 text-[18px] font-semibold text-nowrap md:flex-row md: md:text-[22px]'>
               <p>!Hola</p>

               <p>{name}!</p>

               <p>👋🏻</p>
            </div>

            <p className='text-[16px]'>Explora FUNDES Synergy, una herramienta exclusivamente diseñada para ti.</p>
         </div>

         <div className='absolute bottom-[50px] right-[10px] w-full max-w-[300px] md:max-w-[400px] bg-white p-3 rounded-md shadow-md md:bottom-[120px] md:right-[30px]'>
            <div className='w-fit h-fit p-1 bg-primary-color text-white text-[24px] rounded-full mb-3'>
               <AiOutlineExclamationCircle />
            </div>

            <p>
               Para empezar, puedes explorar las opciones en el menú lateral. Si tienes alguna pregunta, no dudes en
               contactarnos al correo: soporte@fundes.org
            </p>
         </div>

         <img
            src='/photographs/home-img-data.jpg'
            alt='home-data'
            className='absolute bottom-[120px] left-[-10px] rounded-lg hidden md:block'
         />

         <div className='fixed bottom-0 left-0 h-fit w-full bg-white px-6 py-2 text-primary-gray text-right rounded-t-md shadow-md'>
            © 2024, FUNDES Latinoamérica
         </div>
      </div>
   );
}
