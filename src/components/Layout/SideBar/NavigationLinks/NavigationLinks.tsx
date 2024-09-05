import { RiCalculatorLine, RiFolderChartLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { validatePermissions } from '@/utilities/global.utility';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { GrDocumentPerformance } from 'react-icons/gr';
import { AiOutlineLineChart } from 'react-icons/ai';
import { MdOutlineFolderOpen } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './NavigationLinks.module.scss';
import { EPermission } from '@/enums/global.enum';
import { HiOutlineUsers } from 'react-icons/hi';
import { TfiBarChart } from 'react-icons/tfi';
import { FiPieChart } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function NavigationLinks(): JSX.Element {
   // Configuration
   const location = useLocation();

   const pathname = location.pathname;

   // Redux tates
   const { openSideBarDesktop, isHovered } = useSelector((state: RootState) => state.sideBarDesktop);

   const { permissions } = useSelector((state: RootState) => state.user);

   // States
   const [openAdditionalLinks, setOpenAdditionalLinks] = useState<boolean>(false);

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
         return 'bg-primary-color hover:bg-primary-color text-white';
      }

      return '';
   };

   // Styles
   const navigationLinkContainer =
      'w-full min-h-[46px] px-4 flex items-center justify-between gap-3 rounded-r-full hover:bg-light-gray';

   const navigationLinkText = 'w-full text-[14px] leading-[18px] line-clamp-1 text-left';

   const navigationLinkIcon = 'min-w-[22px] text-[22px]';

   const navigationLinkIconArrow = 'min-w-[20px] text-[20px]';

   const subNavigationLinkContainer =
      'w-full min-h-[46px] px-6 flex items-center justify-between gap-3 rounded-r-full hover:bg-light-gray';

   return (
      <div className='w-full h-full flex flex-col gap-1 justify-between'>
         <div className={`h-fit max-h-[480px] w-full overflow-y-auto ${styles.containerNavLinks}`}>
            <Link to='/alliances' className={`${navigationLinkContainer} ${validatePath(pathname, '/alliances')}`}>
               <RiFolderChartLine className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Crecimiento y alianzas</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <div className='h-fit w-full flex flex-col gap-1'>
               <button
                  onClick={() => setOpenAdditionalLinks(!openAdditionalLinks)}
                  className={`${navigationLinkContainer} ${
                     openAdditionalLinks ? 'bg-medium-gray hover:bg-medium-gray' : ''
                  }`}>
                  <TfiBarChart className={`${navigationLinkIcon}`} />

                  {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                     <>
                        <p className={`${navigationLinkText}`}>Operaciones</p>

                        <IoIosArrowForward
                           className={`${navigationLinkIconArrow} transition-all duration-100 ${
                              openAdditionalLinks ? 'rotate-90' : ''
                           }`}
                        />
                     </>
                  )}
               </button>

               {openAdditionalLinks && (openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <div className={`flex flex-col gap-1 ${styles.containerHeightAnimation}`}>
                     <div
                        className={`w-full h-fit ${
                           validatePermissions(permissions, EPermission.OperationDashboards) ? 'cursor-not-allowed' : ''
                        }`}>
                        <Link
                           onClick={() => {}}
                           to='/operations/dashboard'
                           className={`${subNavigationLinkContainer} ${validatePath(
                              pathname,
                              '/operations/dashboard'
                           )} ${
                              validatePermissions(permissions, EPermission.OperationDashboards)
                                 ? 'pointer-events-none text-medium-gray'
                                 : ''
                           }`}>
                           <FiPieChart className={`${navigationLinkIcon}`} />

                           <p className={`${navigationLinkText}`}>Dashboard operaciones</p>
                        </Link>
                     </div>

                     <div
                        className={`w-full h-fit ${
                           validatePermissions(permissions, EPermission.OperationReports) ? 'cursor-not-allowed' : ''
                        }`}>
                        <Link
                           onClick={() => {}}
                           to='/operations/report'
                           className={`${subNavigationLinkContainer} ${validatePath(pathname, '/operations/report')} ${
                              validatePermissions(permissions, EPermission.OperationReports)
                                 ? 'pointer-events-none text-medium-gray'
                                 : ''
                           }`}>
                           <HiOutlineClipboardDocumentList className={`${navigationLinkIcon}`} />

                           <p className={`${navigationLinkText}`}>Reporte operaciones</p>
                        </Link>{' '}
                     </div>

                     <div
                        className={`w-full h-fit ${
                           validatePermissions(permissions, EPermission.ManageIncomesCosts) ? 'cursor-not-allowed' : ''
                        }`}>
                        <Link
                           onClick={() => {}}
                           to='/operations/management'
                           className={`${subNavigationLinkContainer} ${validatePath(
                              pathname,
                              '/operations/management'
                           )} ${
                              validatePermissions(permissions, EPermission.ManageIncomesCosts)
                                 ? 'pointer-events-none text-medium-gray'
                                 : ''
                           }`}>
                           <GrDocumentPerformance className={`${navigationLinkIcon}`} />

                           <p className={`${navigationLinkText}`}>Gestión de ingresos y costos</p>
                        </Link>
                     </div>
                  </div>
               )}
            </div>

            <Link to='/finances' className={`${navigationLinkContainer} ${validatePath(pathname, '/finances')}`}>
               <AiOutlineLineChart className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Finanzas</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/accountancy' className={`${navigationLinkContainer} ${validatePath(pathname, '/accountancy')}`}>
               <RiCalculatorLine className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Contabilidad</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/documents' className={`${navigationLinkContainer} ${validatePath(pathname, '/documents')}`}>
               <MdOutlineFolderOpen className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Control documental</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/corporate' className={`${navigationLinkContainer} ${validatePath(pathname, '/corporate')}`}>
               <RiMoneyDollarCircleLine className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Corporativo</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/talent' className={`${navigationLinkContainer} ${validatePath(pathname, '/talent')}`}>
               <HiOutlineUsers className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Talento humano</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>
         </div>

         <Link to='/configuration' className={`${navigationLinkContainer} ${validatePath(pathname, '/configuration')}`}>
            <IoSettingsOutline className={`${navigationLinkIcon}`} />

            {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
               <>
                  <p className={`${navigationLinkText}`}>Configuración</p>

                  <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
               </>
            )}
         </Link>
      </div>
   );
}
