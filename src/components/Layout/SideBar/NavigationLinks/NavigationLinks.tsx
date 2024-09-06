import { IoIosArrowForward, IoMdCloudUpload } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavigationLinks.module.scss';
import { IoHomeSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function NavigationLinks(): JSX.Element {
   // Configuration
   const location = useLocation();

   const pathname = location.pathname;

   // Redux tates
   const { openSideBarDesktop, isHovered } = useSelector((state: RootState) => state.sideBarDesktop);

   // States
   const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

   // Effects
   useEffect(() => {
      const handleResize = () => {
         setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   // Methods
   const validatePath = (currentPath: string, pathToValidate: string): string => {
      if (currentPath === pathToValidate) {
         return 'bg-primary-color hover:bg-primary-color';
      }

      return '';
   };

   // Styles
   const navigationLinkContainer =
      'w-full min-h-[46px] px-4 flex items-center justify-between gap-3 rounded-r-full hover:bg-light-gray';

   const navigationLinkText = 'w-full text-[14px] leading-[18px] line-clamp-1 text-left';

   const navigationLinkIcon = 'min-w-[22px] text-[22px]';

   const navigationLinkIconArrow = 'min-w-[20px] text-[20px]';

   return (
      <div className='w-full h-full flex flex-col gap-1 justify-between'>
         <div className={`h-fit max-h-[480px] w-full overflow-y-auto overflow-x-hidden ${styles.containerNavLinks}`}>
            <Link to='/' className={`${navigationLinkContainer} ${validatePath(pathname, '/')}`}>
               <IoHomeSharp className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Inicio</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/post' className={`${navigationLinkContainer} ${validatePath(pathname, '/post')}`}>
               <IoMdCloudUpload className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Publicar</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>
         </div>
      </div>
   );
}
