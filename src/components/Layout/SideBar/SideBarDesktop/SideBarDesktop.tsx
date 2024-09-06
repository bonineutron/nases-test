import { setIsHovered, setOpenSideBarDesktop } from '@/redux/features/side-bar-desktop/side-bar-desktop.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavigationLinks } from '@/components';
import { RootState } from '@/redux/store';
import { Link } from 'react-router-dom';

export function SideBarDesktop(): JSX.Element {
   const dispatch = useDispatch();

   // Redux states
   const { openSideBarDesktop, isHovered } = useSelector((state: RootState) => state.sideBarDesktop);

   return (
      <div
         onMouseEnter={() => dispatch(setIsHovered(true))}
         onMouseLeave={() => dispatch(setIsHovered(false))}
         className={`relative hidden md:block h-full text-primary-gray bg-white transition-all duration-100 z-[8] 
            ${openSideBarDesktop ? 'min-w-[280px]' : 'min-w-[64px]'}`}>
         <div
            className={`h-full w-full flex flex-col justify-between gap-6 py-3 transition-all duration-100 shadow-md bg-white ${
               isHovered ? 'absolute !w-[280px] top-0 left-0' : ''
            }`}>
            <div
               className={`h-full w-full max-h-[50px] px-4 flex items-center ${
                  openSideBarDesktop || isHovered ? 'justify-between' : 'justify-center'
               }`}>
               <Link to='/' className='h-full w-fit flex items-center'>
                  <img
                     src='/logo_md.svg'
                     alt='logo'
                     className={`h-[18px] w-auto ${openSideBarDesktop || isHovered ? '' : 'hidden'}`}
                  />
               </Link>

               <button
                  onClick={() => {
                     dispatch(setOpenSideBarDesktop(!openSideBarDesktop));

                     if (openSideBarDesktop) {
                        dispatch(setIsHovered(false));
                     }
                  }}
                  className={`min-w-[22px] text-[22px] hover:bg-light-gray p-[6px] rounded-full text-primary-gray ${
                     openSideBarDesktop ? 'bg-medium-gray hover:bg-medium-gray' : ''
                  }`}>
                  <RxHamburgerMenu />
               </button>
            </div>

            <NavigationLinks />
         </div>
      </div>
   );
}
