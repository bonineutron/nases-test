import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { EPlacement } from '@/components/Popup/Popup.enum';
import { Modal, Popup, SideBarMobile } from '@/components';
import { IoArrowBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
// import { HiSearch } from 'react-icons/hi';
import { LuBell } from 'react-icons/lu';
import { FiMenu } from 'react-icons/fi';

export function TopBar(): JSX.Element {
   // Configuration
   const location = useLocation();

   const pathname = location.pathname;

   const navigate = useNavigate();

   // Redux states
   const { openSideBarDesktop } = useSelector((state: RootState) => state.sideBarDesktop);

   // States
   const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);

   const [openSearch, setopenSearch] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      setOpenMenuMobile(false);
   }, [pathname]);

   // Methods
   // const openSearchModal = () => {
   //    setopenSearch(true);
   // };

   return (
      <div className='sticky top-0 right-0 min-h-[60px] w-full bg-white shadow-md px-6 text-primary-gray z-[7]'>
         <div className='h-full w-full flex items-center justify-between'>
            <div className='h-full w-fit flex gap-6 md:gap-3 items-center '>
               {!openSideBarDesktop && (
                  <Link to='/' className='hidden md:block'>
                     <img
                        src='https://i0.wp.com/fundes.org/wp-content/uploads/2021/11/Fundes_Latinoamérica-1.png?fit=394%2C116&ssl=1'
                        alt='logo-fundes'
                        className={`w-auto h-[50px]`}
                     />
                  </Link>
               )}

               <button onClick={() => setOpenMenuMobile(true)} className='min-w-[24px] text-[24px] md:hidden'>
                  <FiMenu />
               </button>

               <button onClick={() => navigate(-1)} className='rounded-full md:p-[6px] md:hover:bg-light-gray '>
                  <IoArrowBack className='w-[24px] text-[24px]' />
               </button>
            </div>

            {/* <button
               onClick={openSearchModal}
               className='hidden md:flex h-[44px] w-fit border-[1px] border-medium-gray rounded-md px-3 items-center gap-2 hover:bg-light-gray'>
               <p>Búsqueda</p>

               <HiSearch className='min-w-[20px] text-[20px]' />
            </button> */}

            <div className='h-full flex items-center gap-6 md:gap-3'>
               {/* <button onClick={openSearchModal} className='md:hidden'>
                  <HiSearch className='min-w-[24px] text-[24px]' />
               </button> */}

               <Popup
                  content={
                     <div className='flex flex-col items-center gap-3'>
                        <p>Preparando notificaciones.</p>

                        <img src='/global/developer.png' alt='developer' className='h-auto w-[100px]' />
                     </div>
                  }
                  placement={EPlacement.BottomEnd}>
                  <div className='rounded-full md:p-[6px] md:hover:bg-light-gray'>
                     <LuBell className='min-w-[24px] text-[24px]' />
                  </div>
               </Popup>

               <ProfileButton />
            </div>
         </div>

         {openMenuMobile && <SideBarMobile setOpen={setOpenMenuMobile} />}

         {openSearch && (
            <Modal open={openSearch} setOpen={setopenSearch}>
               search component in progress
            </Modal>
         )}
      </div>
   );
}
