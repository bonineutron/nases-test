import { MdCheckCircle, MdClose, MdError, MdInfoOutline } from 'react-icons/md';
import { closeAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ETypeAlertDialog } from './AlertDialog.enum';
import { IoIosWarning } from 'react-icons/io';
import { RootState } from '@/redux/store';
import { Dialog } from '@mui/material';
import { Button } from '@/components';

export function AlertDialog(): React.JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // Redux states
   const { open, type, description } = useSelector((state: RootState) => state.alertDialog);

   // Methods
   const handleClose = (): void => {
      dispatch(closeAlert());
   };

   const validateTitle = (): React.JSX.Element => {
      if (type === ETypeAlertDialog.Warning) {
         return (
            <div className='flex items-center gap-1 text-yellow-500'>
               <IoIosWarning className='text-[24px]' />
               <p>Cuidado</p>
            </div>
         );
      }

      if (type === ETypeAlertDialog.Error) {
         return (
            <div className='flex items-center gap-1 text-red-500'>
               <MdError className='text-[24px]' />
               <p>Ha ocurrido un error</p>
            </div>
         );
      }

      if (type === ETypeAlertDialog.Information) {
         return (
            <div className='flex items-center gap-1 text-gray-500'>
               <MdInfoOutline className='text-[24px]' />
               <p>Información</p>
            </div>
         );
      }

      if (type === ETypeAlertDialog.Success) {
         return (
            <div className='flex items-center gap-1 text-green-500'>
               <MdCheckCircle className='text-[24px]' />
               <p>Exitoso</p>
            </div>
         );
      }

      return <></>;
   };

   return (
      <Dialog
         open={open ?? false}
         onClose={handleClose}
         PaperProps={{
            style: {
               boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
               margin: 0
            }
         }}
         className='!bg-black/20 backdrop-blur-[2px]'
         hideBackdrop>
         <div className='h-fit w-fit p-3 md:p-4 flex flex-col gap-3 rounded-md'>
            <div className='flex items-center justify-between gap-6'>
               <div className='text-nowrap'>{validateTitle()}</div>

               <button className='flex items-center text-red-500 md:hover:text-primary-gray' onClick={handleClose}>
                  <MdClose className='min-w-[24px] text-[24px]' />
               </button>
            </div>

            <div className='px-3'>{description}</div>

            <div className='flex justify-end'>
               <Button onClick={handleClose}>Aceptar</Button>
            </div>
         </div>
      </Dialog>
   );
}
