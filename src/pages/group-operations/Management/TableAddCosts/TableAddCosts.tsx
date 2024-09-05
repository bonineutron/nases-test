import {
   formatNumberWithCommas,
   getCurrentYear,
   getListYears,
   inputChange,
   validatePermissions
} from '@/utilities/global.utility';
import { IResponseGetCostsToBeExecuted } from '@/services/routes/operations/operations.interface';
import { Button, IColumn, Input, Modal, Oval, Select, Table } from '@/components';
import operationsService from '@/services/routes/operations/operations.service';
import { IFormIncome } from '../TableIncomeCosts/TableIncomeCosts.interface';
import { ModalDeleteAccount } from './ModalDeleteAccount/ModalDeleteAccount';
import { ModalAddAccount } from './ModalAddAccount/ModalAddAccount';
import { IRowCostToBeExecuted } from '../Management.interface';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { MdOutlineDeleteForever } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { EPermission } from '@/enums/global.enum';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TableAddCostsProps {
   ceco: string;
   setReloadAccordion: React.Dispatch<React.SetStateAction<boolean>>;
   showAdditionalRows?: boolean;
}

export function TableAddCosts({ ceco, setReloadAccordion, showAdditionalRows }: TableAddCostsProps): JSX.Element {
   // Redux states
   const { email, permissions } = useSelector((state: RootState) => state.user);

   // States
   const [formAddCosts, setFormAddCosts] = useState<IFormIncome>({
      year: { value: String(getCurrentYear()) }
   });

   const [enableMonths, setEnableMonths] = useState<boolean>(false);

   const [currentRows, setCurrentRows] = useState<IRowCostToBeExecuted[]>([]);

   const [loading, setLoading] = useState<boolean>(false);

   const [openAddAccount, setOpenAddAccount] = useState<boolean>(false);

   const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);

   const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

   const [idToDelete, setIdToDelete] = useState<number | null>(null);

   const [updateRows, setUpdateRows] = useState<boolean>(false);

   const [oldCursorPosition, setOldCursorPosition] = useState<number>(0);

   const [rowRoyalExecuted, setRowRoyalExecuted] = useState<IRowCostToBeExecuted | null>(null);

   // Effects
   useEffect(() => {
      getCostsToBeExecuted(ceco);
   }, [formAddCosts.year.value]);

   useEffect(() => {
      if (updateRows) {
         getCostsToBeExecuted(ceco);
      }

      setUpdateRows(false);
   }, [updateRows]);

   // Methods
   const columns: IColumn[] = [
      {
         field: 'actions',
         headerName: '',
         minWidth: 60,
         renderCell: (params: GridRenderCellParams) => {
            if (params.id === 100000 || params.id === 100001 || params.id === 100002) {
               return <></>;
            }
            return (
               <button
                  onClick={() => {
                     setConfirmDelete(true);
                     setIdToDelete(Number(params.id));
                  }}
                  className='h-full w-full flex items-center justify-center'>
                  <MdOutlineDeleteForever className='text-[30px] text-red-500 md:hover:text-primary-gray' />
               </button>
            );
         }
      },
      {
         field: 'accountingAccount',
         headerName: 'Cuenta contable',
         minWidth: 160
      },
      {
         field: 'january',
         headerName: 'Enero',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'february',
         headerName: 'Febrero',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'march',
         headerName: 'Marzo',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'april',
         headerName: 'Abril',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'may',
         headerName: 'Mayo',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'june',
         headerName: 'Junio',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'july',
         headerName: 'Julio',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'august',
         headerName: 'Agosto',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'september',
         headerName: 'Septiembre',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'october',
         headerName: 'Octubre',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'november',
         headerName: 'Noviembre',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'december',
         headerName: 'Diciembre',
         total: true,
         renderCell: (params: GridRenderCellParams) => renderInputCell(params),
         minWidth: 160
      },
      {
         field: 'total',
         headerName: 'Total',
         total: true,
         renderCell: (params: GridRenderCellParams) => {
            return formatNumberWithCommas(params.value?.value ?? 0);
         },
         minWidth: 160
      }
   ];

   const getCostsToBeExecuted = async (ceco: string): Promise<void> => {
      setLoading(true);

      const responseCostsToBeExecuted = await operationsService.getCostsToBeExecuted(
         ceco,
         Number(formAddCosts.year.value)
      );

      let rowsCosts: IRowCostToBeExecuted[] = [];

      if (responseCostsToBeExecuted) {
         const removeRowRoyalExecuted = responseCostsToBeExecuted.filter((item) => item.tipo !== 'Real Ejecutado USD');

         const filterRowRoyalExecuted: IResponseGetCostsToBeExecuted = responseCostsToBeExecuted.filter(
            (item) => item.tipo === 'Real Ejecutado USD'
         )[0];

         const months = [
            filterRowRoyalExecuted.enero,
            filterRowRoyalExecuted.febrero,
            filterRowRoyalExecuted.marzo,
            filterRowRoyalExecuted.abril,
            filterRowRoyalExecuted.mayo,
            filterRowRoyalExecuted.junio,
            filterRowRoyalExecuted.julio,
            filterRowRoyalExecuted.agosto,
            filterRowRoyalExecuted.septiembre,
            filterRowRoyalExecuted.octubre,
            filterRowRoyalExecuted.noviembre,
            filterRowRoyalExecuted.diciembre
         ];

         const totalRealExecuted = { value: months.reduce((acc, month) => acc + (month || 0), 0) };

         setRowRoyalExecuted({
            id: filterRowRoyalExecuted.idCentroCosto,
            accountingAccountSlug: filterRowRoyalExecuted.cuentaContable,
            accountingAccount: filterRowRoyalExecuted.descripcion,
            january: { value: filterRowRoyalExecuted.enero, disabled: false },
            february: { value: filterRowRoyalExecuted.febrero, disabled: false },
            march: { value: filterRowRoyalExecuted.marzo, disabled: false },
            april: { value: filterRowRoyalExecuted.abril, disabled: false },
            may: { value: filterRowRoyalExecuted.mayo, disabled: false },
            june: { value: filterRowRoyalExecuted.junio, disabled: false },
            july: { value: filterRowRoyalExecuted.julio, disabled: false },
            august: { value: filterRowRoyalExecuted.agosto, disabled: false },
            september: { value: filterRowRoyalExecuted.septiembre, disabled: false },
            october: { value: filterRowRoyalExecuted.octubre, disabled: false },
            november: { value: filterRowRoyalExecuted.noviembre, disabled: false },
            december: { value: filterRowRoyalExecuted.diciembre, disabled: false },
            total: { value: totalRealExecuted.value }
         });

         rowsCosts = removeRowRoyalExecuted.map((cost, index) => {
            const months = [
               cost.enero,
               cost.febrero,
               cost.marzo,
               cost.abril,
               cost.mayo,
               cost.junio,
               cost.julio,
               cost.agosto,
               cost.septiembre,
               cost.octubre,
               cost.noviembre,
               cost.diciembre
            ];

            const total = { value: months.reduce((acc, month) => acc + (month || 0), 0) };

            return {
               id: index,
               accountingAccountSlug: cost.cuentaContable,
               accountingAccount: cost.descripcion,
               january: { value: cost.enero, disabled: false },
               february: { value: cost.febrero, disabled: false },
               march: { value: cost.marzo, disabled: false },
               april: { value: cost.abril, disabled: false },
               may: { value: cost.mayo, disabled: false },
               june: { value: cost.junio, disabled: false },
               july: { value: cost.julio, disabled: false },
               august: { value: cost.agosto, disabled: false },
               september: { value: cost.septiembre, disabled: false },
               october: { value: cost.octubre, disabled: false },
               november: { value: cost.noviembre, disabled: false },
               december: { value: cost.diciembre, disabled: false },
               total
            };
         });
      }

      const responseAccountingMonths = await operationsService.getAccountingMonths(Number(formAddCosts.year.value));

      if (responseAccountingMonths && responseAccountingMonths.length > 0) {
         rowsCosts = rowsCosts.map((row) => {
            return {
               ...row,
               january: {
                  ...row.january,
                  disabled: responseAccountingMonths.find((month) => month.mes === 1)?.estadoMes ?? false
               },
               february: {
                  ...row.february,
                  disabled: responseAccountingMonths.find((month) => month.mes === 2)?.estadoMes ?? false
               },
               march: {
                  ...row.march,
                  disabled: responseAccountingMonths.find((month) => month.mes === 3)?.estadoMes ?? false
               },
               april: {
                  ...row.april,
                  disabled: responseAccountingMonths.find((month) => month.mes === 4)?.estadoMes ?? false
               },
               may: {
                  ...row.may,
                  disabled: responseAccountingMonths.find((month) => month.mes === 5)?.estadoMes ?? false
               },
               june: {
                  ...row.june,
                  disabled: responseAccountingMonths.find((month) => month.mes === 6)?.estadoMes ?? false
               },
               july: {
                  ...row.july,
                  disabled: responseAccountingMonths.find((month) => month.mes === 7)?.estadoMes ?? false
               },
               august: {
                  ...row.august,
                  disabled: responseAccountingMonths.find((month) => month.mes === 8)?.estadoMes ?? false
               },
               september: {
                  ...row.september,
                  disabled: responseAccountingMonths.find((month) => month.mes === 9)?.estadoMes ?? false
               },
               october: {
                  ...row.october,
                  disabled: responseAccountingMonths.find((month) => month.mes === 10)?.estadoMes ?? false
               },
               november: {
                  ...row.november,
                  disabled: responseAccountingMonths.find((month) => month.mes === 11)?.estadoMes ?? false
               },
               december: {
                  ...row.december,
                  disabled: responseAccountingMonths.find((month) => month.mes === 12)?.estadoMes ?? false
               }
            };
         });
      }

      setCurrentRows(rowsCosts);

      setLoading(false);
   };

   const renderInputCell = (params: GridRenderCellParams): JSX.Element => {
      const fieldKey = params.colDef.field;

      const id = params.row.id;

      if (params.id === 100000 || params.id === 100001 || params.id === 100002) {
         return <>{formatNumberWithCommas(params.value?.value ?? 0)}</>;
      }

      return (
         <div className='h-full w-full flex items-center'>
            <Input
               id={`input-${fieldKey}-${id}`}
               type='string'
               value={params.value?.value ?? ''}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = event.target.value;

                  let sanitizedInput = newValue.replace(/[^0-9.]/g, '');

                  const parts = sanitizedInput.split('.');

                  if (parts.length > 2) return;

                  if (parts[1] && parts[1].length > 2) {
                     sanitizedInput = `${parts[0]}.${parts[1].slice(0, 2)}`;
                  }

                  const updatedData = currentRows.map((item: any) => {
                     if (item.id === params.id) {
                        const oldValueLength = String(item[fieldKey].value).length;

                        const currentCursorPosition = event.target.selectionStart;

                        const scrollPosition = event.target.scrollLeft;

                        const updatedItem = {
                           ...item,
                           [fieldKey]: {
                              value: sanitizedInput,
                              disabled: false
                           }
                        };

                        const total = Object.keys(updatedItem).reduce((sum, key) => {
                           const typeMonth = key as keyof IRowCostToBeExecuted;

                           if (
                              typeMonth !== 'id' &&
                              typeMonth !== 'accountingAccount' &&
                              typeMonth !== 'accountingAccountSlug' &&
                              typeMonth !== 'total'
                           ) {
                              return sum + Number(updatedItem[typeMonth].value) || 0;
                           }

                           return sum;
                        }, 0);

                        updatedItem.total = { value: total };

                        setTimeout(() => {
                           setOldCursorPosition(currentCursorPosition ?? 0);

                           const input = document.getElementById(
                              `input-${fieldKey}-${item.id}`
                           ) as HTMLInputElement | null;

                           if (input && currentCursorPosition !== null) {
                              input.setSelectionRange(currentCursorPosition, currentCursorPosition);

                              if (
                                 newValue.length > oldValueLength &&
                                 newValue.length > oldValueLength &&
                                 oldCursorPosition === oldValueLength
                              ) {
                                 input.scrollLeft = input.scrollWidth;
                              } else {
                                 input.scrollLeft = scrollPosition;
                              }
                           }
                        }, 10);

                        return updatedItem;
                     }

                     return item;
                  });

                  setCurrentRows(updatedData);
               }}
               onBlur={() => handleInputBlur(params)}
               disabled={enableMonths ? false : params.value?.disabled}
               className='!min-h-fit !h-[40px]'
               outlined
               fullWidth
            />
         </div>
      );
   };

   const handleInputBlur = async (params: GridRenderCellParams): Promise<void> => {
      setLoading(true);

      const response = await operationsService.updateCostToBeExecuted({
         costosPorEjecutarId: 0,
         creadoPorEmail: email,
         fechaCreadoUtc: new Date().toISOString(),
         modificadoPorEmail: email,
         centroCosto: ceco,
         cuentaContable: params.row.accountingAccountSlug,
         descripcion: params.row.accountingAccount,
         anno: Number(formAddCosts.year.value),
         enero: params.row.january.value || 0,
         febrero: params.row.february.value || 0,
         marzo: params.row.march.value || 0,
         abril: params.row.april.value || 0,
         mayo: params.row.may.value || 0,
         junio: params.row.june.value || 0,
         julio: params.row.july.value || 0,
         agosto: params.row.august.value || 0,
         septiembre: params.row.september.value || 0,
         octubre: params.row.october.value || 0,
         noviembre: params.row.november.value || 0,
         diciembre: params.row.december.value || 0,
         validFrom: new Date().toISOString(),
         validTo: new Date().toISOString()
      });

      if (response) {
         const filterRowRoyalExecuted: IResponseGetCostsToBeExecuted = response.filter(
            (item) => item.tipo === 'Real Ejecutado USD'
         )[0];

         const months = [
            filterRowRoyalExecuted.enero,
            filterRowRoyalExecuted.febrero,
            filterRowRoyalExecuted.marzo,
            filterRowRoyalExecuted.abril,
            filterRowRoyalExecuted.mayo,
            filterRowRoyalExecuted.junio,
            filterRowRoyalExecuted.julio,
            filterRowRoyalExecuted.agosto,
            filterRowRoyalExecuted.septiembre,
            filterRowRoyalExecuted.octubre,
            filterRowRoyalExecuted.noviembre,
            filterRowRoyalExecuted.diciembre
         ];

         const total = { value: months.reduce((acc, month) => acc + (month || 0), 0) };

         if (filterRowRoyalExecuted) {
            setRowRoyalExecuted({
               id: filterRowRoyalExecuted.idCentroCosto,
               accountingAccountSlug: filterRowRoyalExecuted.cuentaContable,
               accountingAccount: filterRowRoyalExecuted.descripcion,
               january: { value: filterRowRoyalExecuted.enero, disabled: false },
               february: { value: filterRowRoyalExecuted.febrero, disabled: false },
               march: { value: filterRowRoyalExecuted.marzo, disabled: false },
               april: { value: filterRowRoyalExecuted.abril, disabled: false },
               may: { value: filterRowRoyalExecuted.mayo, disabled: false },
               june: { value: filterRowRoyalExecuted.junio, disabled: false },
               july: { value: filterRowRoyalExecuted.julio, disabled: false },
               august: { value: filterRowRoyalExecuted.agosto, disabled: false },
               september: { value: filterRowRoyalExecuted.septiembre, disabled: false },
               october: { value: filterRowRoyalExecuted.octubre, disabled: false },
               november: { value: filterRowRoyalExecuted.noviembre, disabled: false },
               december: { value: filterRowRoyalExecuted.diciembre, disabled: false },
               total: { value: total.value }
            });
         }
      }

      setReloadAccordion(true);

      setLoading(false);
   };

   const removeRow = async (idToRemove: number): Promise<void> => {
      const getRowToDelete = currentRows.find((item) => item.id === idToRemove);

      if (getRowToDelete) {
         const response = await operationsService.deleteAccount({
            centroCosto: ceco,
            cuentaContable: getRowToDelete.accountingAccountSlug,
            anno: Number(formAddCosts.year.value)
         });

         if (response && !response.error) {
            setUpdateRows(true);

            setConfirmDelete(false);
         }
      }
   };

   return (
      <div className='h-fit w-full'>
         <div className='w-full flex justify-between items-center'>
            <Select
               label='Año'
               options={getListYears().map((year) => ({
                  value: String(year),
                  label: String(year)
               }))}
               value={formAddCosts.year.value}
               onChange={(event: SelectChangeEvent<string>) => {
                  inputChange<IFormIncome, string>(setFormAddCosts, 'year', event.target.value);
               }}
               customWidth='100px'
               outlined
            />
            <div className='flex items-center gap-3'>
               <Button
                  onClick={() => setEnableMonths((prev) => !prev)}
                  disabled={validatePermissions(permissions, EPermission.EnableMonthsIncomesCosts)}
                  tertiary>
                  {enableMonths ? 'Deshabilitar Meses' : 'Habilitar Meses'}
               </Button>

               <Button onClick={() => setOpenAddAccount(true)}>Agregar Cuenta</Button>
            </div>
         </div>

         <div className='relative h-fit w-full'>
            <Table
               columns={columns}
               rows={currentRows}
               totalRow='costs'
               rowAdditionalCost={rowRoyalExecuted}
               showAdditionalRows={showAdditionalRows}
            />

            {loading && (
               <div className='absolute bottom-0 left-0 h-[50px] w-fit px-6 flex items-center gap-2'>
                  <Oval size={20} />

                  <p className='text-[14px]'>Cargando...</p>
               </div>
            )}
         </div>

         <Button onClick={() => setOpenDeleteAccount(true)} className='!mt-3 !text-red-500' tertiary>
            Eliminar cuenta
         </Button>

         {openAddAccount && (
            <ModalAddAccount
               currentRows={currentRows}
               ceco={ceco}
               year={Number(formAddCosts.year.value)}
               open={openAddAccount}
               setOpen={setOpenAddAccount}
               setUpdateRows={setUpdateRows}
            />
         )}

         {openDeleteAccount && (
            <ModalDeleteAccount
               currentRows={currentRows}
               ceco={ceco}
               year={Number(formAddCosts.year.value)}
               open={openDeleteAccount}
               setOpen={setOpenDeleteAccount}
               setUpdateRows={setUpdateRows}
            />
         )}

         {confirmDelete && (
            <Modal open={confirmDelete} setOpen={setConfirmDelete}>
               <div className='h-fit w-full flex flex-col items-end'>
                  <p className='w-full'>¿Esta seguro de eliminar la cuenta?</p>

                  <Button onClick={() => removeRow(idToDelete ?? 0)} className='!bg-red-500 !mt-3 !w-fit'>
                     Eliminar
                  </Button>
               </div>
            </Modal>
         )}
      </div>
   );
}
