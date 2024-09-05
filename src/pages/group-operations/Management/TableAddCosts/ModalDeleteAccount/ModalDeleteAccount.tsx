import { IAccountingAccounts } from '@/services/routes/operations/operations.interface';
import operationsService from '@/services/routes/operations/operations.service';
import { Button, ETypeAlertDialog, Modal, Oval, Select } from '@/components';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IRowCostToBeExecuted } from '../../Management.interface';
import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ModalDeleteAccountProps {
   ceco: string;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   currentRows: IRowCostToBeExecuted[];
   year: number;
   setUpdateRows: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalDeleteAccount({
   ceco,
   open,
   setOpen,
   currentRows,
   year,
   setUpdateRows
}: ModalDeleteAccountProps): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // States
   const [accountingAccounts, setAccountingAccounts] = useState<IAccountingAccounts[]>([]);

   const [selectedAccount, setSelectedAccount] = useState<string>('');

   const [loading, setLoading] = useState<boolean>(true);

   // Effects
   useEffect(() => {
      setAccounts();
   }, []);

   // Methods
   const setAccounts = (): void => {
      setLoading(true);

      const newRows = currentRows.map((row) => ({
         cuentaContable: row.accountingAccountSlug,
         descripcion: row.accountingAccount
      }));

      setAccountingAccounts(newRows.sort((a, b) => a.descripcion.localeCompare(b.descripcion)));

      setLoading(false);
   };

   const deleteAccount = async (): Promise<void> => {
      setLoading(true);

      const getIdAccount = accountingAccounts.find((item) => item.descripcion === selectedAccount);

      if (getIdAccount) {
         const response = await operationsService.deleteAccount({
            centroCosto: ceco,
            cuentaContable: getIdAccount.cuentaContable,
            anno: year
         });

         if (response && !response.error) {
            dispatch(
               openAlert({
                  type: ETypeAlertDialog.Success,
                  description: 'Cuenta eliminada.'
               })
            );

            setOpen(false);

            setUpdateRows(true);
         }
      }

      setLoading(false);
   };

   return (
      <Modal open={open} setOpen={setOpen}>
         <div className='relative h-fit w-full flex flex-col items-center'>
            <div className='h-fit w-full text-primary-gray mb-6'>
               <p className='text-[16px] font-semibold'>
                  ¿Seguro que quieres eliminar esta cuenta contable? Esta acción es irreversible.
               </p>

               <p className='text-[14px]'>Por favor, selecciona la cuenta contable que deseas eliminar:</p>
            </div>

            <Select
               label='Cuenta contable'
               options={accountingAccounts.map((item) => ({ value: item.descripcion, label: item.descripcion }))}
               value={selectedAccount}
               onChange={(event: SelectChangeEvent<string>) => {
                  setSelectedAccount(event.target.value);
               }}
               fullWidth
               outlined
            />

            <div className='w-full flex items-centern justify-end gap-3'>
               <Button
                  onClick={deleteAccount}
                  disabled={selectedAccount ? false : true}
                  loading={loading}
                  className='!bg-red-500'>
                  Eliminar
               </Button>
            </div>

            {loading && (
               <div className='absolute top-0 left-0 h-[70%] z-[1] w-[101%] bg-white/20 backdrop-blur-[2px] rounded-md overflow-hidden flex items-center justify-center'>
                  <Oval size={60} />
               </div>
            )}
         </div>
      </Modal>
   );
}
