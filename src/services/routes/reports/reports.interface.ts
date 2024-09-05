export interface IBodyGetReportIncomesCosts {
   anno: number;
   areaDeNegocio: string;
}

export interface IResponseGetReportIncomesCosts {
   id: number;
   centroCostos: string;
   fuenteProyecto: string;
   nombreProyecto: string;
   companiaRegistro: string;
   areaDeNegocio: string;
   responsable: string;
   hub: string;
   anno: number;
   ingresoEnero: number;
   ingresoFebrero: number;
   ingresoMarzo: number;
   ingresoAbril: number;
   ingresoMayo: number;
   ingresoJunio: number;
   ingresoJulio: number;
   ingresoAgosto: number;
   ingresoSeptiembre: number;
   ingresoOctubre: number;
   ingresoNoviembre: number;
   ingresoDiciembre: number;
   totalIngresosEjecutadosAnnosAnteriores: number;
   totalIngresosEjecutados: number;
   totalIngresosProyectados: number;
   costoEnero: number;
   costoFebrero: number;
   costoMarzo: number;
   costoAbril: number;
   costoMayo: number;
   costoJunio: number;
   costoJulio: number;
   costoAgosto: number;
   costoSeptiembre: number;
   costoOctubre: number;
   costoNoviembre: number;
   costoDiciembre: number;
   totalCostosEjecutadosAnnosAnteriores: number;
   totalCostosEjecutados: number;
   totalCostosProyectados: number;
   margenBrutoPresupuesto: number;
   margenBrutoAcumuladoReal: number;
   margenBrutoProyectadoMesAnterior: number;
   margenBrutoProyectado: number;
   margenBrutoAProyectarReal: number;
   margenBrutoProyectadoFinal: number;
   margenBrutoEjecutadoReal: number;
   margenBrutoRealUSD: number;
   margenBrutoProyectadoUSD: number;
   margenBrutoTotalUSD: number;
   margenBrutoTotalEnPorcentaje: number;
   utilidadProyectada: number;
}

export interface IResponseGetCecosByState {
   centroCostos: string;
   descripcion: string;
   estado: string;
}

export interface IBodyGetReportConsultProjects {
   anno?: number;
   areaDeNegocio?: string;
   consolidadoDetallado: string;
   periodo: string;
   centroCostos: string[];
   tipoIngresoCosto: string;
}

export interface IResponseGetReportConsultProjects {
   periodo?: any;
   fecha?: any;
   companniaOrigen?: any;
   compannia?: any;
   pais?: any;
   asiento?: any;
   consecutivo?: any;
   centroCosto?: any;
   cuentaContable?: any;
   detalleCuentaContable?: any;
   descripcion?: any;
   tipoCuentaContable?: any;
   referencia?: any;
   monedaLocal?: any;
   debitoLocal?: any;
   creditoLocal?: any;
   debitoDolar?: any;
   creditoDolar?: any;
   presupuestoMontoDolar?: any;
   presupuestoMontoDolarAcumulado?: any;
   ejecucionRealMesDolar?: any;
   ejecucionRealMesDolarAcumulado?: any;
   presupuestoTotalMontoDolar?: any;
   cuentaContableTexto?: any;
   netoLocal?: any;
   netoDolar?: any;
   subEjecucionSobrEjecucion?: any;
   gastoAnual?: any;
}

export interface IResponseGetReportCostsProjectedMontly {
   fuenteProyecto: string;
   centroCostos: string;
   descripcion: string;
   companniaRegistro: string;
   areaDeNegocio: string;
   responsable: string;
   moneda: string;
   hub: string;
   anno: number;
   meses: IMonths;
   totalCostosReales: number;
   totalCostosProyectadosUSD: number;
   totalCostosProyectadosML: number;
}

export interface IMonths {
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
}
