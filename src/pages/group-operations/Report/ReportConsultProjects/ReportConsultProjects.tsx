import { IResponseGetReportConsultProjects } from '@/services/routes/reports/reports.interface';
import { formatDate, formatNumberWithCommas } from '@/utilities/global.utility';
import { Button, IColumn, Input, Table } from '@/components';
import { GridRenderCellParams } from '@mui/x-data-grid';
import CardPage from '@/components/CardPage/CardPage';
import { useEffect, useState } from 'react';
import { utils, writeFile } from 'xlsx';

interface ReportConsultProjectsProps {
   rows: IResponseGetReportConsultProjects[];
   report: string;
}

export function ReportConsultProjects({ rows, report }: ReportConsultProjectsProps): JSX.Element {
   // Configuration
   const consolidatedColumns: IColumn[] = [
      {
         field: 'periodo',
         headerName: 'Periodo',
         minWidth: 120,
         renderCell: (params: GridRenderCellParams) => (params.id !== 100000 ? formatDate(params.value) : 'Total')
      },
      {
         field: 'companniaOrigen',
         headerName: 'Compañia',
         minWidth: 140
      },
      {
         field: 'centroCosto',
         headerName: 'Ceco',
         minWidth: 100
      },
      {
         field: 'tipoCuentaContable',
         headerName: 'Tipo de cuenta',
         minWidth: 160
      },
      {
         field: 'cuentaContable',
         headerName: 'Cuenta contable',
         minWidth: 160
      },
      {
         field: 'cuentaContableTexto',
         headerName: 'Cuenta Contable Texto',
         minWidth: 200
      },

      {
         field: 'descripcion',
         headerName: 'Descripción',
         minWidth: 200
      },
      {
         field: 'ejecucionRealMesDolar',
         headerName: 'Ejeción mes',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ejecucionRealMesDolarAcumulado',
         headerName: 'Ejeción acumulada',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'subEjecucionSobrEjecucion',
         headerName: 'Sobre ejecución (Subejecución)',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) =>
            params.id !== 100000 ? formatNumberWithCommas(params.value) : ''
      },
      {
         field: 'presupuestoTotalMontoDolar',
         headerName: 'Presupuesto total',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      }
   ];

   const detailedColumns: IColumn[] = [
      {
         field: 'periodo',
         headerName: 'Periodo',
         minWidth: 120,
         renderCell: (params: GridRenderCellParams) => (params.id !== 100000 ? formatDate(params.value) : 'Total')
      },
      {
         field: 'fecha',
         headerName: 'Fecha',
         minWidth: 120,
         renderCell: (params: GridRenderCellParams) => (params.id !== 100000 ? formatDate(params.value) : '')
      },
      {
         field: 'pais',
         headerName: 'País',
         minWidth: 120
      },
      {
         field: 'asiento',
         headerName: 'Asiento',
         minWidth: 120
      },
      {
         field: 'centroCosto',
         headerName: 'Ceco',
         minWidth: 100
      },
      {
         field: 'tipoCuentaContable',
         headerName: 'Tipo de cuenta',
         minWidth: 160
      },
      {
         field: 'detalleCuentaContable',
         headerName: 'Detalle',
         minWidth: 200
      },
      {
         field: 'referencia',
         headerName: 'Referencia',
         minWidth: 200
      },
      {
         field: 'monedaLocal',
         headerName: 'Moneda',
         minWidth: 100
      },
      {
         field: 'debitoLocal',
         headerName: 'Debito Local',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) =>
            params.id !== 100000 ? formatNumberWithCommas(params.value) : ''
      },
      {
         field: 'creditoLocal',
         headerName: 'Credito Local',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) =>
            params.id !== 100000 ? formatNumberWithCommas(params.value) : ''
      },
      {
         field: 'debitoDolar',
         headerName: 'Debito Dolar',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'creditoDolar',
         headerName: 'Credito Dolar',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'netoDolar',
         headerName: 'Neto Dolar',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'netoLocal',
         headerName: 'Neto Local',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) =>
            params.id !== 100000 ? formatNumberWithCommas(params.value) : ''
      }
   ];

   // States
   const [currentRows, setCurrentRows] = useState<IResponseGetReportConsultProjects[]>([]);

   const [search, setSearch] = useState<string>('');

   // Effects
   useEffect(() => {
      setCurrentRows(rows);
   }, [rows]);

   // Methods
   const exportToExcel = (): void => {
      let calculatedTotalRow: Record<string, number | string> = {};

      calculatedTotalRow.periodo = 'Total';

      if (report === 'C') {
         consolidatedColumns.forEach((column, index) => {
            if (index > 0 && column.total) {
               const total = currentRows
                  .map((row: any) => row[column.field])
                  .reduce((accumulator, currentValue) => accumulator + (currentValue || 0), 0);
               const formattedTotal = total % 1 === 0 ? total : total.toFixed(2);
               calculatedTotalRow[column.field] = Number(formattedTotal);
            }
         });
      }

      if (report === 'D') {
         detailedColumns.forEach((column, index) => {
            if (index > 0 && column.total) {
               const total = currentRows
                  .map((row: any) => row[column.field])
                  .reduce((accumulator, currentValue) => accumulator + (currentValue || 0), 0);
               const formattedTotal = total % 1 === 0 ? total : total.toFixed(2);
               calculatedTotalRow[column.field] = Number(formattedTotal);
            }
         });
      }

      const newRows = [...currentRows, calculatedTotalRow];
      const translatedData = newRows.map((item: any) => item);
      const worksheet = utils.json_to_sheet(translatedData);
      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, 'Consulta');
      writeFile(workbook, 'Consulta.xlsx');
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const searchValue = event.target.value.toLowerCase();
      setSearch(searchValue);

      if (report === 'C') {
         const filteredRows = rows.filter(
            (row) =>
               row.periodo.toLowerCase().startsWith(searchValue) ||
               row.companniaOrigen.toLowerCase().startsWith(searchValue) ||
               row.centroCosto.toLowerCase().startsWith(searchValue) ||
               row.tipoCuentaContable.toLowerCase().startsWith(searchValue) ||
               row.cuentaContable.toLowerCase().startsWith(searchValue) ||
               row.cuentaContableTexto.toLowerCase().startsWith(searchValue) ||
               row.descripcion.toLowerCase().startsWith(searchValue)
         );

         setCurrentRows(filteredRows);
      }

      if (report === 'D') {
         const filteredRows = rows.filter(
            (row) =>
               row.periodo.toLowerCase().startsWith(searchValue) ||
               row.fecha.toLowerCase().startsWith(searchValue) ||
               row.pais.toLowerCase().startsWith(searchValue) ||
               row.asiento.toLowerCase().startsWith(searchValue) ||
               row.centroCosto.toLowerCase().startsWith(searchValue) ||
               row.tipoCuentaContable.toLowerCase().startsWith(searchValue) ||
               row.detalleCuentaContable.toLowerCase().startsWith(searchValue) ||
               row.referencia.toLowerCase().startsWith(searchValue) ||
               row.monedaLocal.toLowerCase().startsWith(searchValue)
         );

         setCurrentRows(filteredRows);
      }
   };

   return (
      <CardPage>
         <div className='flex justify-between items-center pt-1'>
            <Input
               type='text'
               label='Buscar'
               value={search}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange(event);
               }}
               customWidth='250px'
               outlined
            />

            <Button onClick={exportToExcel} tertiary>
               Exportar
            </Button>
         </div>

         <Table
            columns={report === 'C' ? consolidatedColumns : detailedColumns}
            rows={currentRows}
            customItemsPerPage={20}
            totalRow
         />
      </CardPage>
   );
}
