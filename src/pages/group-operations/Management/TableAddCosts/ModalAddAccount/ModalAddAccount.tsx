import { IAccountingAccounts } from '@/services/routes/operations/operations.interface';
import operationsService from '@/services/routes/operations/operations.service';
import { Button, ETypeAlertDialog, Modal, Oval, Select } from '@/components';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IRowCostToBeExecuted } from '../../Management.interface';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';

interface ModalAddAccountProps {
   ceco: string;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   currentRows: IRowCostToBeExecuted[];
   year: number;
   setUpdateRows: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalAddAccount({
   ceco,
   open,
   setOpen,
   currentRows,
   year,
   setUpdateRows
}: ModalAddAccountProps): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // Redux states
   const { email } = useSelector((state: RootState) => state.user);

   // States
   const [accountingAccounts, setAccountingAccounts] = useState<IAccountingAccounts[]>([]);

   const [selectedAccount, setSelectedAccount] = useState<string>('');

   const [loading, setLoading] = useState<boolean>(true);

   // Effects
   useEffect(() => {
      getAccountingAccounts();
   }, []);

   // Methods
   const getAccountingAccounts = async (): Promise<void> => {
      setLoading(true);

      const response = await operationsService.getAccountingAccounts(ceco);

      if (response) {
         setAccountingAccounts(response);
      }

      setLoading(false);
   };

   const addAccount = async (): Promise<void> => {
      const existsAccount = currentRows.some((item) => item.accountingAccount === selectedAccount);

      if (existsAccount) {
         dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Cuenta existente.' }));

         setSelectedAccount('');

         return;
      }

      setLoading(true);

      const getIdAccount = accountingAccounts.find((item) => item.descripcion === selectedAccount);

      if (getIdAccount) {
         const response = await operationsService.updateCostToBeExecuted({
            costosPorEjecutarId: 0,
            creadoPorEmail: email,
            fechaCreadoUtc: new Date().toISOString(),
            modificadoPorEmail: email,
            centroCosto: ceco,
            cuentaContable: getIdAccount.cuentaContable,
            descripcion: getIdAccount.descripcion,
            anno: year,
            enero: 0,
            febrero: 0,
            marzo: 0,
            abril: 0,
            mayo: 0,
            junio: 0,
            julio: 0,
            agosto: 0,
            septiembre: 0,
            octubre: 0,
            noviembre: 0,
            diciembre: 0,
            validFrom: new Date().toISOString(),
            validTo: new Date().toISOString()
         });

         if (response && !response.error) {
            dispatch(
               openAlert({
                  type: ETypeAlertDialog.Success,
                  description: 'Cuenta agregada.'
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
               <p className='text-[16px] font-semibold'>¡Hola! Está a punto de agregar una nueva cuenta contable.</p>

               <p className='text-[14px]'>
                  Por favor, asegúrese de seleccionar correctamente la nueva cuenta contable. Esta información ayudará a
                  mantener un registro preciso de las transacciones contables.
               </p>
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
               <Button onClick={addAccount} disabled={selectedAccount ? false : true} loading={loading}>
                  Agregar
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
