import { IRowsReportCostsProjectedMontly } from '../Report.interface';
import { formatNumberWithCommas } from '@/utilities/global.utility';
import { Button, IColumn, Input, Table } from '@/components';
import { GridRenderCellParams } from '@mui/x-data-grid';
import CardPage from '@/components/CardPage/CardPage';
import { useEffect, useState } from 'react';
import { utils, writeFile } from 'xlsx';

interface ReportCostsProjectedMonthlyProps {
   rows: IRowsReportCostsProjectedMontly[];
}

export function ReportCostsProjectedMonthly({ rows }: ReportCostsProjectedMonthlyProps): JSX.Element {
   // Configuration
   const columns: IColumn[] = [
      {
         field: 'fuenteProyecto',
         headerName: 'Fuente proyecto',
         minWidth: 140
      },
      {
         field: 'companniaRegistro',
         headerName: 'Compañía de registro',
         minWidth: 140
      },
      {
         field: 'centroCostos',
         headerName: 'Centro de costos',
         minWidth: 140
      },
      {
         field: 'descripcion',
         headerName: 'Descripción',
         minWidth: 200
      },
      {
         field: 'hub',
         headerName: 'Hub',
         minWidth: 60
      },
      {
         field: 'responsable',
         headerName: 'Responsable',
         minWidth: 160
      },
      {
         field: 'anno',
         headerName: 'Año',
         minWidth: 60
      },
      {
         field: 'enero',
         headerName: 'Enero',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'febrero',
         headerName: 'Febrero',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'marzo',
         headerName: 'Marzo',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'abril',
         headerName: 'Abril',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'mayo',
         headerName: 'Mayo',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'junio',
         headerName: 'Junio',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'julio',
         headerName: 'Julio',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'agosto',
         headerName: 'Agosto',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'septiembre',
         headerName: 'Septiembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'octubre',
         headerName: 'Octubre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'noviembre',
         headerName: 'Noviembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'diciembre',
         headerName: 'Diciembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalCostosReales',
         headerName: 'Total costos reales',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalCostosProyectadosUSD',
         headerName: 'Total costos proyectados USD',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      }
   ];

   // States
   const [currentRows, setCurrentRows] = useState<IRowsReportCostsProjectedMontly[]>([]);

   const [search, setSearch] = useState<string>('');

   // Effects
   useEffect(() => {
      setCurrentRows(rows);
   }, [rows]);

   // Methods
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const searchValue = event.target.value.toLowerCase();
      setSearch(searchValue);

      const filteredRows = rows.filter(
         (row) =>
            String(row.anno).startsWith(searchValue) ||
            row.areaDeNegocio.toLowerCase().startsWith(searchValue) ||
            row.centroCostos.toLowerCase().startsWith(searchValue) ||
            row.companniaRegistro.toLowerCase().startsWith(searchValue) ||
            row.descripcion.toLowerCase().startsWith(searchValue) ||
            row.fuenteProyecto.toLowerCase().startsWith(searchValue) ||
            row.hub.toLowerCase().startsWith(searchValue) ||
            row.responsable.toLowerCase().startsWith(searchValue)
      );

      setCurrentRows(filteredRows);
   };

   const exportToExcel = (): void => {
      let calculatedTotalRow: Record<string, number | string> = {};

      calculatedTotalRow.fuenteProyecto = 'Total';

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

      const translatedData = newRows.map((item: any) => item);

      const worksheet = utils.json_to_sheet(translatedData);

      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, 'Costos');

      writeFile(workbook, 'Costos.xlsx');
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

         <Table columns={columns} rows={currentRows} customItemsPerPage={20} totalRow />
      </CardPage>
   );
}
