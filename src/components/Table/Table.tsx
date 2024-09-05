import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { stylesTable, theme } from '@/utilities/material-ui.utility';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid/locales';
import { IColumn } from './Table.inteface';
import { useState } from 'react';

interface TableProps<T> {
   columns: IColumn[];
   rows: T[];
   description?: string;
   totalRow?: boolean | 'costs';
   oneRow?: boolean;
   customItemsPerPage?: number;
   rowAdditionalCost?: any;
   showAdditionalRows?: boolean;
   hideProjectSource?: boolean;
}

export function Table<T>({
   columns,
   rows,
   description,
   totalRow,
   oneRow,
   customItemsPerPage,
   rowAdditionalCost,
   showAdditionalRows,
   hideProjectSource
}: TableProps<T>): JSX.Element {
   // Configuration
   const columnsTable: GridColDef[] = columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      minWidth: column.minWidth ?? 120,
      sortable: false,
      renderCell: column.renderCell ?? undefined,
      flex: 1
   }));

   const rowsTable = rows.map((row, index) => ({
      ...row,
      id: index
   }));

   // States
   const [currentPage, setCurrentPage] = useState(1);

   const [itemsPerPage, setItemsPerPage] = useState(customItemsPerPage ? 10 : 5);

   // Methods
   const handlePrevPage = (): void => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
   };

   const handleNextPage = (): void => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   };

   const calculateHeightTable = (): string => {
      const heightRow = 50;

      const heightHeaderColumn = 60;

      const heightScrollBar = 20;

      const totalHeight = itemsPerPage * heightRow + heightHeaderColumn + heightScrollBar;

      if (oneRow) {
         const removeHeight = 1 * heightRow + heightHeaderColumn + heightScrollBar;

         return `${removeHeight}px`;
      }

      if (rowAdditionalCost) {
         const addHeightToTotalRow = totalHeight + 150;

         return `${addHeightToTotalRow}px`;
      }

      if (totalRow) {
         const addHeightToTotalRow = totalHeight + 50;

         return `${addHeightToTotalRow}px`;
      }

      return `${totalHeight}px`;
   };

   const indexOfLastItem = currentPage * itemsPerPage;

   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

   const currentRows = rowsTable.slice(indexOfFirstItem, indexOfLastItem);

   const totalPages = Math.ceil(rows.length / itemsPerPage);

   let calculatedTotalRow: any = {};

   let realTotalRow: any = {};

   let calculatedDifferenceRow: any = {
      id: 100002,
      accountingAccountSlug: 'calculatedDifferenceRow',
      accountingAccount: 'Diferencia',
      january: {
         value: 0,
         disabled: false
      },
      february: {
         value: 0,
         disabled: false
      },
      march: {
         value: 0,
         disabled: false
      },
      april: {
         value: 0,
         disabled: false
      },
      may: {
         value: 0,
         disabled: false
      },
      june: {
         value: 0,
         disabled: false
      },
      july: {
         value: 0,
         disabled: false
      },
      august: {
         value: 0,
         disabled: false
      },
      september: {
         value: 0,
         disabled: false
      },
      october: {
         value: 0,
         disabled: false
      },
      november: {
         value: 0,
         disabled: false
      },
      december: {
         value: 0,
         disabled: false
      },
      total: { value: 0 }
   };

   if (rowAdditionalCost) {
      realTotalRow = {
         id: 100001,
         accountingAccountSlug: 'calculatedRealTotalRow',
         accountingAccount: 'Real ejecutado USD',
         january: {
            value: rowAdditionalCost.january.value,
            disabled: false
         },
         february: {
            value: rowAdditionalCost.february.value,
            disabled: false
         },
         march: {
            value: rowAdditionalCost.march.value,
            disabled: false
         },
         april: {
            value: rowAdditionalCost.april.value,
            disabled: false
         },
         may: {
            value: rowAdditionalCost.may.value,
            disabled: false
         },
         june: {
            value: rowAdditionalCost.june.value,
            disabled: false
         },
         july: {
            value: rowAdditionalCost.july.value,
            disabled: false
         },
         august: {
            value: rowAdditionalCost.august.value,
            disabled: false
         },
         september: {
            value: rowAdditionalCost.september.value,
            disabled: false
         },
         october: {
            value: rowAdditionalCost.october.value,
            disabled: false
         },
         november: {
            value: rowAdditionalCost.november.value,
            disabled: false
         },
         december: {
            value: rowAdditionalCost.december.value,
            disabled: false
         },
         total: { value: rowAdditionalCost.total.value }
      };
   }

   if (totalRow) {
      calculatedTotalRow.id = 100000;

      if (totalRow === 'costs') {
         calculatedTotalRow.accountingAccount = 'Total proyectado';
      } else {
         calculatedTotalRow.year = 'Total';
         calculatedTotalRow.nombreProyecto = 'Total';
         calculatedTotalRow.periodo = 'Total';
         calculatedTotalRow.fuenteProyecto = hideProjectSource ? '' : 'Total';
      }

      if (totalRow === 'costs' && rowAdditionalCost) {
         columns.forEach((column, index) => {
            if (index > 1 && column.total) {
               const total = currentRows
                  .map((row: any) => row[column.field].value)
                  .reduce((accumulator, currentValue) => accumulator + (Number(currentValue) || 0), 0);

               const formattedTotal = total % 1 === 0 ? total : total.toFixed(2);

               calculatedTotalRow[column.field] = { value: formattedTotal };

               calculatedDifferenceRow[column.field] = { value: total - rowAdditionalCost[column.field].value };
            }
         });
      } else {
         columns.forEach((column, index) => {
            if (index > 0 && column.total) {
               const total = currentRows
                  .map((row: any) => row[column.field])
                  .reduce((accumulator, currentValue) => accumulator + (currentValue || 0), 0);

               const formattedTotal = total % 1 === 0 ? total : total.toFixed(2);

               calculatedTotalRow[column.field] = formattedTotal;
            }
         });
      }
   }

   // Styles
   const iconArrow = 'min-w-[30px] text-[30px] text-primary-gray hover:md:text-primary-color';

   const iconArrowDisabled = '!text-medium-gray hover:!md:text-medium-gray';

   const validateRows = () => {
      if (rowAdditionalCost && showAdditionalRows) {
         return [...currentRows, calculatedTotalRow, realTotalRow, calculatedDifferenceRow];
      }

      if (calculatedTotalRow.id && !showAdditionalRows && realTotalRow.id) {
         return [...currentRows, calculatedTotalRow, realTotalRow];
      }

      if (calculatedTotalRow.id && !showAdditionalRows) {
         return [...currentRows, calculatedTotalRow];
      }

      return currentRows;
   };

   return (
      <div className='text-[#000000DE]'>
         <ThemeProvider theme={theme}>
            <DataGrid
               initialState={{
                  pagination: {
                     paginationModel: { page: 0, pageSize: customItemsPerPage ? customItemsPerPage + 1 : 13 }
                  }
               }}
               columns={columnsTable}
               rows={validateRows()}
               columnHeaderHeight={60}
               rowHeight={50}
               sx={stylesTable}
               isRowSelectable={() => false}
               localeText={esES.components.MuiDataGrid.defaultProps.localeText}
               disableColumnMenu
               hideFooter
               showCellVerticalBorder
               style={{ height: calculateHeightTable(), borderBottom: oneRow ? '' : 'none' }}
            />
         </ThemeProvider>

         {!oneRow && (
            <div className='h-[50px] w-full px-[20px] flex justify-end md:justify-between items-center text-[14px] border-[#E0E0E0] border-b-[1px] border-x-[1px] bg-white'>
               <p className='hidden md:block'>{description}</p>

               <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1'>
                     <p>Mostrar:</p>

                     <select
                        value={itemsPerPage}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                           setCurrentPage(1);

                           setItemsPerPage(Number(event.target.value));
                        }}
                        className='bg-light-gray py-1 px-[1px] rounded-md outline-none border-[1px] border-[#E0E0E0]'>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        {customItemsPerPage && <option value={customItemsPerPage}>{customItemsPerPage}</option>}
                     </select>
                  </div>

                  <div className='leading-[0px]'>
                     {indexOfFirstItem + 1} - {indexOfLastItem}
                  </div>

                  <div className='flex items-center'>
                     <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`${iconArrow} ${currentPage === 1 ? iconArrowDisabled : ''}`}>
                        <MdOutlineKeyboardArrowLeft />
                     </button>

                     <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`${iconArrow} ${
                           currentPage === totalPages || totalPages === 0 ? iconArrowDisabled : ''
                        }`}>
                        <MdOutlineKeyboardArrowRight />
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
