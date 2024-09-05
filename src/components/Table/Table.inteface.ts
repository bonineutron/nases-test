import { GridRenderCellParams } from '@mui/x-data-grid';

export interface IColumn {
   field: string;
   headerName: string;
   total?: boolean;
   renderCell?: (params: GridRenderCellParams) => React.ReactNode;
   minWidth?: number;
}
