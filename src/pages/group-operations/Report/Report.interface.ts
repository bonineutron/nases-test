import { EAreasReportCostsProjectedMonthly, EAreasReportIncomesCosts, EReportType } from './Report.enum';
import { IField } from '@/interfaces/global.interface';

export interface ISelectedReportType {
   type: IField<EReportType | null>;
}

export interface IFormReportIncomesCosts {
   area: IField<EAreasReportIncomesCosts | null>;
   year: IField<number | null>;
}

export interface IFormReportConsultProjects {
   period: IField<string>;
   cecos: IField<string[] | null>;
   report: string;
   state: IField<string | null>;
   type: IField<string | null>;
}

export interface IFormReportCostsProjectedMonthly {
   area: IField<EAreasReportCostsProjectedMonthly | null>;
}

export interface IRowsReportCostsProjectedMontly {
   fuenteProyecto: string;
   centroCostos: string;
   descripcion: string;
   companniaRegistro: string;
   areaDeNegocio: string;
   responsable: string;
   moneda: string;
   hub: string;
   anno: number;
   enero: number;
   febrero: number;
   marzo: number;
   abril: number;
   mayo: number;
   junio: number;
   julio: number;
   agosto: number;
   septiembre: number;
   octubre: number;
   noviembre: number;
   diciembre: number;
   totalCostosReales: number;
   totalCostosProyectadosUSD: number;
   totalCostosProyectadosML: number;
}
