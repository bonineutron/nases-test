import { IResponseGetReportIncomesCosts } from '@/services/routes/reports/reports.interface';
import { formatNumberWithCommas } from '@/utilities/global.utility';
import { Button, IColumn, Input, Table } from '@/components';
import { GridRenderCellParams } from '@mui/x-data-grid';
import CardPage from '@/components/CardPage/CardPage';
import { useEffect, useState } from 'react';
import { utils, writeFile } from 'xlsx';

interface ReportIncomesCostsProps {
   rows: IResponseGetReportIncomesCosts[];
}

export function ReportIncomesCosts({ rows }: ReportIncomesCostsProps): JSX.Element {
   // Configuration
   const columns: IColumn[] = [
      {
         field: 'nombreProyecto',
         headerName: 'Nombre del proyecto',
         minWidth: 200
      },
      {
         field: 'responsable',
         headerName: 'Responsable',
         minWidth: 160
      },
      {
         field: 'areaDeNegocio',
         headerName: 'Área',
         minWidth: 100
      },
      {
         field: 'centroCostos',
         headerName: 'Centro de costos',
         minWidth: 100
      },
      {
         field: 'companiaRegistro',
         headerName: 'Compañía',
         minWidth: 140
      },
      {
         field: 'fuenteProyecto',
         headerName: 'Fuente del proyecto',
         minWidth: 140
      },
      {
         field: 'hub',
         headerName: 'Hub',
         minWidth: 100
      },
      {
         field: 'ingresoEnero',
         headerName: 'Ingreso enero',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoFebrero',
         headerName: 'Ingreso febrero',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoMarzo',
         headerName: 'Ingreso marzo',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoAbril',
         headerName: 'Ingreso abril',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoMayo',
         headerName: 'Ingreso mayo',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoJunio',
         headerName: 'Ingreso junio',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoJulio',
         headerName: 'Ingreso julio',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoAgosto',
         headerName: 'Ingreso agosto',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoSeptiembre',
         headerName: 'Ingreso septiembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoOctubre',
         headerName: 'Ingreso octubre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoNoviembre',
         headerName: 'Ingreso noviembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'ingresoDiciembre',
         headerName: 'Ingreso diciembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoEnero',
         headerName: 'Costo enero',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoFebrero',
         headerName: 'Costo febrero',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoMarzo',
         headerName: 'Costo marzo',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoAbril',
         headerName: 'Costo abril',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoMayo',
         headerName: 'Costo mayo',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoJunio',
         headerName: 'Costo junio',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoJulio',
         headerName: 'Costo julio',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoAgosto',
         headerName: 'Costo agosto',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoSeptiembre',
         headerName: 'Costo septiembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoOctubre',
         headerName: 'Costo octubre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoNoviembre',
         headerName: 'Costo noviembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'costoDiciembre',
         headerName: 'Costo diciembre',
         minWidth: 160,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoTotalEnPorcentaje',
         headerName: 'Margen Bruto Total (%)',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => (params.id !== 100000 ? `${params.value} %` : '')
      },
      {
         field: 'margenBrutoAProyectarReal',
         headerName: 'Margen Bruto a Proyectar Real',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoAcumuladoReal',
         headerName: 'Margen Bruto Acumulado Real',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoEjecutadoReal',
         headerName: 'Margen Bruto Ejecutado Real',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoPresupuesto',
         headerName: 'Margen Bruto Presupuesto',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoProyectado',
         headerName: 'Margen Bruto Proyectado',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoProyectadoFinal',
         headerName: 'Margen Bruto Proyectado Final',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoProyectadoMesAnterior',
         headerName: 'Margen Bruto Proyectado Mes Anterior',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoProyectadoUSD',
         headerName: 'Margen Bruto Proyectado USD',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoRealUSD',
         headerName: 'Margen Bruto Real USD',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'margenBrutoTotalUSD',
         headerName: 'Margen Bruto Total USD',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalCostosEjecutados',
         headerName: 'Total Costos Ejecutados',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalCostosEjecutadosAnnosAnteriores',
         headerName: 'Total Costos Ejecutados Años Anteriores',
         minWidth: 250,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalCostosProyectados',
         headerName: 'Total Costos Proyectados',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalIngresosEjecutados',
         headerName: 'Total Ingresos Ejecutados',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalIngresosEjecutadosAnnosAnteriores',
         headerName: 'Total Ingresos Ejecutados Años Anteriores',
         minWidth: 250,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'totalIngresosProyectados',
         headerName: 'Total Ingresos Proyectados',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      },
      {
         field: 'utilidadProyectada',
         headerName: 'Utilidad Proyectada',
         minWidth: 200,
         renderCell: (params: GridRenderCellParams) => formatNumberWithCommas(params.value),
         total: true
      }
   ];

   // States
   const [currentRows, setCurrentRows] = useState<IResponseGetReportIncomesCosts[]>([]);

   const [search, setSearch] = useState<string>('');

   // Effects
   useEffect(() => {
      setCurrentRows(rows);
   }, [rows]);

   // Methods
   const exportToExcel = (): void => {
      let calculatedTotalRow: Record<string, number | string> = {};

      calculatedTotalRow.id = 'Total';

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

      utils.book_append_sheet(workbook, worksheet, 'Ingresos-Costos');

      writeFile(workbook, 'Ingresos-Costos.xlsx');
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const searchValue = event.target.value.toLowerCase();
      setSearch(searchValue);

      const filteredRows = rows.filter(
         (row) =>
            row.areaDeNegocio.toLowerCase().startsWith(searchValue) ||
            row.centroCostos.toLowerCase().startsWith(searchValue) ||
            row.companiaRegistro.toLowerCase().startsWith(searchValue) ||
            row.fuenteProyecto.toLowerCase().startsWith(searchValue) ||
            row.hub.toLowerCase().startsWith(searchValue) ||
            row.nombreProyecto.toLowerCase().startsWith(searchValue) ||
            row.responsable.toLowerCase().startsWith(searchValue)
      );

      setCurrentRows(filteredRows);
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

         <Table columns={columns} rows={currentRows} customItemsPerPage={20} totalRow hideProjectSource />
      </CardPage>
   );
}
