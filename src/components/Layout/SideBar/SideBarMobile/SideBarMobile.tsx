import { NavigationLinks } from '@/components';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface SideBarMobileProps {
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBarMobile({ setOpen }: SideBarMobileProps): JSX.Element {
   // States
   const [transition, setTransition] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      setTransition(true);
   }, []);

   // Methods
   const handleClose = (): void => {
      setTransition(false);

      setTimeout(() => {
         setOpen(false);
      }, 100);
   };

   return (
      <div
         onClick={handleClose}
         className={`fixed top-0 left-0 h-screen w-screen bg-black/20 backdrop-blur-[2px] opacity-0 transition-all duration-100 ${
            transition ? 'opacity-100' : ''
         }`}>
         <div
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
               event.stopPropagation();
            }}
            className={`h-full w-full max-w-[280px] py-3 shadow-md transition-all duration-100 translate-x-[-100%] text-primary-gray bg-white ${
               transition ? '!translate-x-[0%]' : ''
            }`}>
            <div className='h-full w-full flex flex-col gap-6'>
               <div className={`h-full w-full max-h-[50px] px-4 flex items-center justify-between`}>
                  <Link to='/' className='h-full w-fit flex items-center'>
                     <img src='/logo_md.svg' alt='logo' className={`h-[18px] w-auto`} />
                  </Link>

                  <button onClick={handleClose} className={`min-w-[28px] text-[28px]`}>
                     <MdClose />
                  </button>
               </div>

               <NavigationLinks />
            </div>
         </div>
      </div>
   );
}
