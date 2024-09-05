import {
   formatDateTime,
   formatNumberWithCommas,
   getCurrentYear,
   getListYears,
   inputChange,
   validatePermissions
} from '@/utilities/global.utility';
import { IDataIncomeToBeExecuted, IRowIncomeToBeExecuted, IValuesIncomesToBeExecuted } from '../Management.interface';
import operationsService from '@/services/routes/operations/operations.service';
import { IFormIncome } from '../TableIncomeCosts/TableIncomeCosts.interface';
import { Button, IColumn, Input, Oval, Select, Table } from '@/components';
import { FaArrowDown, FaCheckCircle } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { SelectChangeEvent } from '@mui/material';
import { EPermission } from '@/enums/global.enum';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TableAddIncomesProps {
   ceco: string;
   values: IValuesIncomesToBeExecuted | null;
   setReloadAccordion: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TableAddIncomes({ ceco, values, setReloadAccordion }: TableAddIncomesProps): JSX.Element {
   // Configuration
   const initialInputs: IRowIncomeToBeExecuted = {
      january: { value: 0, disabled: false },
      february: { value: 0, disabled: false },
      march: { value: 0, disabled: false },
      april: { value: 0, disabled: false },
      may: { value: 0, disabled: false },
      june: { value: 0, disabled: false },
      july: { value: 0, disabled: false },
      august: { value: 0, disabled: false },
      september: { value: 0, disabled: false },
      october: { value: 0, disabled: false },
      november: { value: 0, disabled: false },
      december: { value: 0, disabled: false }
   };

   // Redux states
   const { email, permissions } = useSelector((state: RootState) => state.user);

   // States
   const [formAddIncomes, setFormAddIncomes] = useState<IFormIncome>({
      year: { value: String(getCurrentYear()) }
   });

   const [data, setData] = useState<IDataIncomeToBeExecuted | null>(null);

   const [currentRows, setCurrentRows] = useState<IRowIncomeToBeExecuted>(initialInputs);

   const [total, setTotal] = useState<number | null>(null);

   const [enableMonths, setEnableMonths] = useState<boolean>(false);

   const [summation, setSummation] = useState<number>(0);

   const [itsTrue, setItsTrue] = useState<boolean>(false);

   const [loading, setLoading] = useState<boolean>(false);

   const [oldCursorPosition, setOldCursorPosition] = useState<number>(0);

   // Effects
   useEffect(() => {
      getIncomesToBeExecuted(ceco);
   }, [formAddIncomes.year.value]);

   useEffect(() => {
      let totalSum = 0;

      for (const month in currentRows) {
         const typeMonth = month as keyof IRowIncomeToBeExecuted;

         totalSum += Number(currentRows[typeMonth].value || 0);
      }

      totalSum = parseFloat(totalSum.toFixed(2));

      setTotal(totalSum);
   }, [currentRows]);

   useEffect(() => {
      if (values?.totalProjectAmount && data) {
         const result = values.totalProjectAmount - data.totalAmountExecuted - data.totalAmountProjected;

         setSummation(Number(result.toFixed(2)));
      }
   }, [values, data, total]);

   useEffect(() => {
      if (Math.abs(summation) <= 5) {
         setItsTrue(true);
      } else {
         setItsTrue(false);
      }
   }, [summation]);

   // Methods
   const columns: IColumn[] = [
      {
         field: 'january',
         headerName: 'Enero',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-january'
                  type='string'
                  value={currentRows.january.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'january');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.january.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'february',
         headerName: 'Febrero',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-february'
                  type='string'
                  value={currentRows.february.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'february');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.february.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'march',
         headerName: 'Marzo',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-march'
                  type='string'
                  value={currentRows.march.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'march');
                  }}
                  onBlur={handleInputBlur}
                  className='!min-h-fit !h-[40px]'
                  disabled={enableMonths ? false : currentRows.march.disabled}
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'april',
         headerName: 'Abril',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-april'
                  type='string'
                  value={currentRows.april.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'april');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.april.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'may',
         headerName: 'Mayo',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-may'
                  type='string'
                  value={currentRows.may.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'may');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.may.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'june',
         headerName: 'Junio',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-june'
                  type='string'
                  value={currentRows.june.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'june');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.june.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'july',
         headerName: 'Julio',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-july'
                  type='string'
                  value={currentRows.july.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'july');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.july.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'august',
         headerName: 'Agosto',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-august'
                  type='string'
                  value={currentRows.august.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'august');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.august.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'september',
         headerName: 'Septiembre',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-september'
                  type='string'
                  value={currentRows.september.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'september');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.september.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'october',
         headerName: 'Octubre',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-october'
                  type='string'
                  value={currentRows.october.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'october');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.october.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'november',
         headerName: 'Noviembre',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-november'
                  type='string'
                  value={currentRows.november.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'november');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.november.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'december',
         headerName: 'Diciembre',
         renderCell: () => (
            <div className='h-full w-full flex items-center'>
               <Input
                  id='input-december'
                  type='string'
                  value={currentRows.december.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     handleInputChange(event, 'december');
                  }}
                  onBlur={handleInputBlur}
                  disabled={enableMonths ? false : currentRows.december.disabled}
                  className='!min-h-fit !h-[40px]'
                  outlined
                  fullWidth
               />
            </div>
         ),
         minWidth: 160
      },
      {
         field: 'total',
         headerName: 'Total',
         renderCell: () => formatNumberWithCommas(total ?? 0),
         minWidth: 160
      }
   ];

   const handleInputBlur = async (): Promise<void> => {
      setLoading(true);

      if (values) {
         const response = await operationsService.updateIncomeToBeExecuted({
            ingresosPorEjecutarId: 0,
            creadoPorEmail: email,
            fechaCreadoUtc: new Date().toISOString(),
            modificadoPorEmail: email,
            centroCosto: ceco,
            hubVenta: values.hub,
            hubEjecucionIngreso: '',
            hubEquipoEjecucion: '',
            anno: Number(formAddIncomes.year.value),
            enero: currentRows.january.value || 0,
            febrero: currentRows.february.value || 0,
            marzo: currentRows.march.value || 0,
            abril: currentRows.april.value || 0,
            mayo: currentRows.may.value || 0,
            junio: currentRows.june.value || 0,
            julio: currentRows.july.value || 0,
            agosto: currentRows.august.value || 0,
            septiembre: currentRows.september.value || 0,
            octubre: currentRows.october.value || 0,
            noviembre: currentRows.november.value || 0,
            diciembre: currentRows.december.value || 0,
            margenBrutoEsperado: 0,
            validFrom: new Date().toISOString(),
            validTo: new Date().toISOString(),
            fuenteProyecto: values.sourceIncome
         });

         if (response && !response.error) {
            const responseIncomeToBeExecuted = await operationsService.getIncomeToBeExecuted(
               ceco,
               Number(formAddIncomes.year.value)
            );

            if (responseIncomeToBeExecuted) {
               setData({
                  totalAmountExecuted: responseIncomeToBeExecuted.sumaTotalEjecutadoML ?? 0,
                  totalAmountExecutedPreviousyears: responseIncomeToBeExecuted.sumaTotalEjecutadoAnnoAnteriorML ?? 0,
                  totalAmountProjectedSubsequentYears:
                     responseIncomeToBeExecuted.sumaTotalProyectadoAnnoPosteriorML ?? 0,
                  totalAmountProjected: responseIncomeToBeExecuted.sumaTotalProyectadoML ?? 0,
                  lastModifiedBy: responseIncomeToBeExecuted.modificadoPor,
                  date: responseIncomeToBeExecuted.fechaModificadoUtc
               });

               setReloadAccordion(true);
            }
         }
      }

      setLoading(false);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, month: keyof IRowIncomeToBeExecuted) => {
      const newValue = event.target.value;

      const oldValueLength = String(currentRows.august.value).length;

      const currentCursorPosition = event.target.selectionStart;

      const scrollPosition = event.target.scrollLeft;

      let sanitizedInput = newValue.replace(/[^0-9.]/g, '');

      const parts = sanitizedInput.split('.');

      if (parts.length > 2) return;

      if (parts[1] && parts[1].length > 2) {
         sanitizedInput = `${parts[0]}.${parts[1].slice(0, 2)}`;
      }

      setCurrentRows({
         ...currentRows,
         [month]: { value: sanitizedInput }
      });

      setTimeout(() => {
         setOldCursorPosition(currentCursorPosition ?? 0);

         const input = document.getElementById(`input-${month}`) as HTMLInputElement | null;

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
   };

   const getIncomesToBeExecuted = async (ceco: string): Promise<void> => {
      setLoading(true);

      const responseIncomeToBeExecuted = await operationsService.getIncomeToBeExecuted(
         ceco,
         Number(formAddIncomes.year.value)
      );

      let monthsValues: IRowIncomeToBeExecuted = initialInputs;

      if (responseIncomeToBeExecuted) {
         monthsValues = {
            january: { value: responseIncomeToBeExecuted.enero, disabled: false },
            february: { value: responseIncomeToBeExecuted.febrero, disabled: false },
            march: { value: responseIncomeToBeExecuted.marzo, disabled: false },
            april: { value: responseIncomeToBeExecuted.abril, disabled: false },
            may: { value: responseIncomeToBeExecuted.mayo, disabled: false },
            june: { value: responseIncomeToBeExecuted.junio, disabled: false },
            july: { value: responseIncomeToBeExecuted.julio, disabled: false },
            august: { value: responseIncomeToBeExecuted.agosto, disabled: false },
            september: { value: responseIncomeToBeExecuted.septiembre, disabled: false },
            october: { value: responseIncomeToBeExecuted.octubre, disabled: false },
            november: { value: responseIncomeToBeExecuted.noviembre, disabled: false },
            december: { value: responseIncomeToBeExecuted.diciembre, disabled: false }
         };

         setData({
            totalAmountExecuted: responseIncomeToBeExecuted.sumaTotalEjecutadoML ?? 0,
            totalAmountExecutedPreviousyears: responseIncomeToBeExecuted.sumaTotalEjecutadoAnnoAnteriorML ?? 0,
            totalAmountProjectedSubsequentYears: responseIncomeToBeExecuted.sumaTotalProyectadoAnnoPosteriorML ?? 0,
            totalAmountProjected: responseIncomeToBeExecuted.sumaTotalProyectadoML ?? 0,
            lastModifiedBy: responseIncomeToBeExecuted.modificadoPor,
            date: responseIncomeToBeExecuted.fechaModificadoUtc
         });
      }

      const responseAccountingMonths = await operationsService.getAccountingMonths(Number(formAddIncomes.year.value));

      if (responseAccountingMonths && responseAccountingMonths.length > 0) {
         responseAccountingMonths.forEach((item) => {
            const monthName = item.mesNombre.toLowerCase();

            switch (monthName) {
               case 'enero':
                  monthsValues.january.disabled = item.estadoMes;
                  break;
               case 'febrero':
                  monthsValues.february.disabled = item.estadoMes;
                  break;
               case 'marzo':
                  monthsValues.march.disabled = item.estadoMes;
                  break;
               case 'abril':
                  monthsValues.april.disabled = item.estadoMes;
                  break;
               case 'mayo ':
                  monthsValues.may.disabled = item.estadoMes;
                  break;
               case 'junio':
                  monthsValues.june.disabled = item.estadoMes;
                  break;
               case 'julio':
                  monthsValues.july.disabled = item.estadoMes;
                  break;
               case 'agosto':
                  monthsValues.august.disabled = item.estadoMes;
                  break;
               case 'septiembre':
                  monthsValues.september.disabled = item.estadoMes;
                  break;
               case 'octubre':
                  monthsValues.october.disabled = item.estadoMes;
                  break;
               case 'noviembre':
                  monthsValues.november.disabled = item.estadoMes;
                  break;
               case 'diciembre':
                  monthsValues.december.disabled = item.estadoMes;
                  break;
            }
         });

         setCurrentRows(monthsValues);
      }

      setLoading(false);
   };

   const cardDetail = (label: string, amount: number) => {
      return (
         <div className='w-full max-w-[250px] p-3 rounded-md shadow-md bg-light-gray text-primary-gray'>
            <div className='flex gap-3 items-center'>
               <div
                  className={`h-fit w-fit rounded-full p-2 text-white text-[30px] ${
                     itsTrue ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                  <AiOutlineInfoCircle />
               </div>

               <p className='text-[18px] font-semibold text-center'>{label}</p>
            </div>

            <div className='mt-3 w-fit min-w-[120px] h-[40px] rounded-md border-[1px] border-current px-3 flex items-center mx-auto'>
               {formatNumberWithCommas(amount)}
            </div>
         </div>
      );
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
               value={formAddIncomes.year.value}
               onChange={(event: SelectChangeEvent<string>) => {
                  inputChange<IFormIncome, string>(setFormAddIncomes, 'year', event.target.value);
               }}
               customWidth='100px'
               outlined
            />

            <Button
               onClick={() => setEnableMonths((prev) => !prev)}
               disabled={validatePermissions(permissions, EPermission.EnableMonthsIncomesCosts)}
               tertiary>
               {enableMonths ? 'Deshabilitar Meses' : 'Habilitar Meses'}
            </Button>
         </div>

         <Table columns={columns} rows={[currentRows]} oneRow />

         {data && (
            <>
               <div className='relative h-fit w-[90%] md:w-[80%] flex flex-col gap-6 items-center mt-6 mx-auto'>
                  <div
                     className={`h-fit w-full p-6 border-[2px] rounded-md flex justify-between gap-6 flex-wrap ${
                        itsTrue ? 'border-green-500' : 'border-red-500'
                     }`}>
                     {cardDetail('Monto total del proyecto', values?.totalProjectAmount ?? 0)}

                     {cardDetail('Suma total ejecutado', data.totalAmountExecuted)}

                     {cardDetail('Suma total proyectado', data.totalAmountProjected)}

                     {cardDetail('Suma total ejecutado años anteriores', data.totalAmountExecutedPreviousyears)}

                     {cardDetail('Suma total proyectado años posteriores', data.totalAmountProjectedSubsequentYears)}

                     {cardDetail('Margen proyectado de cierre', values?.projectedClosingMargin ?? 0)}
                  </div>

                  <div className='h-fit w-full bg-light-gray rounded-md flex gap-3 py-3 justify-center'>
                     <p>Verifica sumatoria:</p>

                     <div className='flex items-center gap-1'>
                        <p>{formatNumberWithCommas(values?.totalProjectAmount ?? 0)}</p>

                        <span>-</span>

                        <p>{formatNumberWithCommas(data.totalAmountExecuted)}</p>

                        <span>-</span>

                        <p>{formatNumberWithCommas(data.totalAmountProjected)}</p>

                        <span>=</span>

                        <p>{formatNumberWithCommas(summation)}</p>

                        <FaArrowDown
                           className={`text-[18px] ${itsTrue ? 'text-green-500' : 'text-red-500'} ${
                              summation > 0 ? '' : 'rotate-180 mb-1'
                           } ${summation === 0 ? 'hidden' : ''}`}
                        />

                        <FaCheckCircle
                           className={`text-[18px] text-green-500 ${summation === 0 ? 'block' : 'hidden'}`}
                        />
                     </div>
                  </div>

                  <div
                     className={`h-fit w-full flex items-center justify-center py-1 text-white text-[18px] font-semibold rounded-md ${
                        itsTrue ? 'bg-green-500' : 'bg-red-500'
                     }`}>
                     {itsTrue ? 'Verdadero' : 'Falso'}
                  </div>

                  {loading && (
                     <div className='absolute top-0 left-0 h-full w-full bg-black/20 backdrop-blur-[2px] rounded-md overflow-hidden flex items-center justify-center'>
                        <Oval size={60} />
                     </div>
                  )}
               </div>

               <div className='text-[14px] text-primary-gray mt-6 flex justify-between items-center'>
                  <p>Nota: Los montos de la tabla estan en moneda del proyecto.</p>

                  <p>Última modificación: {data.lastModifiedBy}</p>

                  <p>{formatDateTime(data.date)}</p>
               </div>
            </>
         )}
      </div>
   );
}
