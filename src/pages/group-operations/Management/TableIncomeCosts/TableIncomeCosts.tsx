import { formatNumberWithCommas, inputChange } from '@/utilities/global.utility';
import { IColumn } from '@/components/Table/Table.inteface';
import { IFormIncome } from './TableIncomeCosts.interface';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { IIncomeCost } from '../Management.interface';
import { Button, Input, Table } from '@/components';
import { useEffect, useState } from 'react';
import { writeFile, utils } from 'xlsx';

interface TableIncomeCostsProps {
   rows: IIncomeCost[];
}

export function TableIncomeCosts({ rows }: TableIncomeCostsProps): JSX.Element {
   // Configuration
   const columns: IColumn[] = [
      {
         field: 'year',
         headerName: 'Año',
         minWidth: 60
      },
      {
         field: 'description',
         headerName: 'Descripción',
         minWidth: 200
      },
      {
         field: 'january',
         headerName: 'Enero',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'february',
         headerName: 'Febrero',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'march',
         headerName: 'Marzo',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'april',
         headerName: 'Abril',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'may',
         headerName: 'Mayo',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'june',
         headerName: 'Junio',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'july',
         headerName: 'Julio',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'august',
         headerName: 'Agosto',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'september',
         headerName: 'Septiembre',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'october',
         headerName: 'Octubre',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'november',
         headerName: 'Noviembre',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'december',
         headerName: 'Diciembre',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      },
      {
         field: 'total',
         headerName: 'Total',
         total: true,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value)
      }
   ];

   // States
   const [formIncome, setFormIncome] = useState<IFormIncome>({
      year: { value: '' }
   });

   const [currentRows, setCurrentRows] = useState<IIncomeCost[]>([]);

   // Effects
   useEffect(() => {
      setCurrentRows(rows);
   }, [rows]);

   // Methods
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      inputChange<IFormIncome, string>(setFormIncome, 'year', event.target.value);

      const filteredRows = rows.filter((row) => row.year.toString().startsWith(event.target.value));

      setCurrentRows(filteredRows);
   };

   const exportToExcel = (): void => {
      const translations = {
         year: 'Año',
         description: 'Descripción',
         january: 'Enero',
         february: 'Febrero',
         march: 'Marzo',
         april: 'Abril',
         may: 'Mayo',
         june: 'Junio',
         july: 'Julio',
         august: 'Agosto',
         september: 'Septiembre',
         october: 'Octubre',
         november: 'Noviembre',
         december: 'Diciembre',
         total: 'Total'
      };

      const translateKeys = (obj: IIncomeCost, map: Record<string, string>) => {
         const newObj: Record<string, string | number> = {};

         for (const key in obj) {
            const typeKey = key as keyof IIncomeCost;

            if (map[typeKey]) {
               newObj[map[typeKey]] = obj[typeKey];
            } else {
               newObj[typeKey] = obj[typeKey];
            }
         }

         return newObj;
      };

      let calculatedTotalRow: Record<string, number | string> = {};

      calculatedTotalRow.year = 'Total';

      columns.forEach((column, index) => {
         if (index > 0 && column.total) {
            const total = currentRows
               .map((row: any) => row[column.field])
               .reduce((accumulator, currentValue) => accumulator + (currentValue || 0), 0);

            const formattedTotal = total % 1 === 0 ? total : total.toFixed(2);

            calculatedTotalRow[column.field] = Number(formattedTotal);
         }
      });

      const newRows = [...currentRows, calculatedTotalRow];

      const translatedData = newRows.map((item: any) => translateKeys(item, translations));

      const worksheet = utils.json_to_sheet(translatedData);

      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, 'Ingresos-Costos');

      writeFile(workbook, 'Ingresos-Costos.xlsx');
   };

   return (
      <div className='h-fit w-full'>
         <div className='flex justify-between items-center'>
            <Input
               name='year-income'
               type='text'
               label='Año'
               value={formIncome.year.value}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange(event);
               }}
               customWidth='100px'
               outlined
            />

            <Button onClick={exportToExcel} tertiary>
               Exportar
            </Button>
         </div>

         <Table columns={columns} rows={currentRows} totalRow />
      </div>
   );
}
