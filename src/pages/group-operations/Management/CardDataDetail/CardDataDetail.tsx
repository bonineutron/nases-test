import operationsService from '@/services/routes/operations/operations.service';
import { validatePermissions } from '@/utilities/global.utility';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { IDataDetail } from '../Management.interface';
import { IoLocationOutline } from 'react-icons/io5';
import { FaCreativeCommons } from 'react-icons/fa';
import { EPermission } from '@/enums/global.enum';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components';
import { useState } from 'react';

interface CardDataDetailProps {
   data: IDataDetail;
}

export function CardDataDetail({ data }: CardDataDetailProps): JSX.Element {
   // Redux states
   const { permissions, email } = useSelector((state: RootState) => state.user);

   // States
   const [loadingCloseAccountingMonth, setLoadingCloseAccountingMonth] = useState<boolean>(false);

   // Methods
   const closeAccountingMonth = async (): Promise<void> => {
      setLoadingCloseAccountingMonth(true);

      const response = await operationsService.closeAccountingMonth(email);

      if (response && response.data) {
         // Reload apis
      }

      setLoadingCloseAccountingMonth(false);
   };

   // Styles
   const iconDataDetail = 'min-w-[24px] text-[24px] bg-light-gray p-2 rounded-full';

   const titleDataDetail = 'text-[18px] font-semibold';

   const simpleInfo = 'w-full flex items-end justify-between md:max-w-fit gap-3 text-[14px] text-nowrap';

   return (
      <div className='h-fit w-full p-3 md:p-6 bg-white shadow-md rounded-md text-primary-gray flex flex-col gap-6 items-center text-[14px]'>
         <div className='w-full flex items-end gap-6'>
            <div className='w-full'>
               <p className='text-[18px] font-semibold leading-[22px] mb-1'>{data.dataName.title}</p>

               <p>Nombre del proyecto</p>
            </div>

            <div className='text-nowrap hidden md:block'>
               <Button
                  onClick={closeAccountingMonth}
                  disabled={validatePermissions(permissions, EPermission.CloseAccountingMonth)}
                  loading={loadingCloseAccountingMonth}>
                  Cerrar mes contable
               </Button>
            </div>
         </div>

         <div className='w-full flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-between'>
            <div className={`${simpleInfo}`}>
               <div>
                  <p className={`${titleDataDetail}`}>{data.dataId.ceco}</p>

                  <p>Centro de Costos</p>
               </div>

               <span className={`${iconDataDetail}`}>
                  <FaCreativeCommons />
               </span>
            </div>

            <div className={`${simpleInfo}`}>
               <div>
                  <p className={`${titleDataDetail}`}>{data.dataInfo.hub}</p>

                  <p>Hub Venta</p>
               </div>

               <span className={`${iconDataDetail}`}>
                  <AiOutlineExclamationCircle />
               </span>
            </div>

            <div className={`${simpleInfo}`}>
               <div>
                  <p className={`${titleDataDetail}`}>{data.dataInfo.type ? `Tipo ${data.dataInfo.type}` : 'NA'}</p>

                  <p>Fuente de ingresos</p>
               </div>

               <span className={`${iconDataDetail}`}>
                  <AiOutlineExclamationCircle />
               </span>
            </div>

            <div className={`${simpleInfo}`}>
               <div>
                  <p className={`${titleDataDetail}`}>{data.dataLocation.country}</p>

                  <p>País</p>
               </div>

               <span className={`${iconDataDetail}`}>
                  <IoLocationOutline />
               </span>
            </div>

            <div className={`${simpleInfo}`}>
               <div>
                  <p className={`${titleDataDetail}`}>{data.dataLocation.currency}</p>

                  <p>Moneda</p>
               </div>

               <span className={`${iconDataDetail}`}>
                  <RiMoneyDollarCircleLine />
               </span>
            </div>
         </div>

         <div className='text-nowrap md:hidden'>
            <Button disabled={validatePermissions(permissions, EPermission.CloseAccountingMonth)}>
               Cerrar mes contable
            </Button>
         </div>
      </div>
   );
}
