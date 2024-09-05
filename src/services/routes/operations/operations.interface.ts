export interface ICecosByExecutor {
   ejecutor: string;
   cecos: ICeco[];
}

export interface ICeco {
   centroCostos: string;
   descripcion: string;
}

export interface IResponseGetInfoCeco {
   compannia: string;
   centroCostos: string;
   descripcion: string;
   moneda: string;
   montoProyectoMonedaLocal: number;
   montoProyectoMonedaUSD: number;
   pais: string;
   hub: string;
   margenBrutoPresupuesto: number;
   companniaRegistro: string;
   fuenteIngresos?: any;
   margenDeCierre?: any;
}

export interface IIncomesCostsCeco {
   centroCosto: string;
   cuentaContable: string;
   tipoCuentaContable: string;
   descripcion: string;
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
   total: number;
}

export interface IResponseIncomesCostsCeco {
   incomes: IIncomesCostsCeco[];
   costs: IIncomesCostsCeco[];
}

export interface IResponseGetIncomeToBeExecuted {
   centroCosto: string;
   creadoPor: string;
   fechaCreadoUtc: string;
   modificadoPor: string;
   fechaModificadoUtc: string;
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
   sumaTotalEjecutadoML: number;
   sumaTotalProyectadoML: number;
   sumaTotalEjecutadoAnnoAnteriorML: number;
   sumaTotalProyectadoAnnoPosteriorML: number;
}

export interface IResponseGetAccountingMonth {
   anno: number;
   mes: number;
   mesNombre: string;
   estadoMes: boolean;
}
export interface IBodyUpdateIncomeToBeExecuted {
   ingresosPorEjecutarId: number;
   creadoPorEmail: string;
   fechaCreadoUtc: string;
   modificadoPorEmail: string;
   centroCosto: string;
   hubVenta: string;
   hubEjecucionIngreso: string;
   hubEquipoEjecucion: string;
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
   margenBrutoEsperado: number;
   validFrom: string;
   validTo: string;
   fuenteProyecto: string;
}

export interface IResponseGetCostsToBeExecuted {
   idCentroCosto: number;
   centroCosto: string;
   cuentaContable: string;
   descripcion: string;
   creadoPor: string;
   fechacCreadoUtc: string;
   modificadoPor: string;
   fechaModificadoUtc: string;
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
   tipo: string;
}

export interface IResponseGetAccountingAccounts {
   centroCosto: string;
   cuentasContables: IAccountingAccounts[];
}

export interface IAccountingAccounts {
   cuentaContable: string;
   descripcion: string;
}

export interface IBodyUpdateCostToBeExecuted {
   costosPorEjecutarId: number;
   creadoPorEmail: string;
   fechaCreadoUtc: string;
   modificadoPorEmail: string;
   centroCosto: string;
   cuentaContable: string;
   descripcion: string;
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
   validFrom: string;
   validTo: string;
}

export interface IResponseUpdateCostToBeExecuted {
   tipo: string;
   idCentroCosto: number;
   centroCosto: string;
   cuentaContable: string;
   descripcion: string;
   creadoPor: string;
   fechacCreadoUtc: string;
   modificadoPor: string;
   fechaModificadoUtc: string;
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
}

export interface IBodyDeleteAccount {
   centroCosto: string;
   cuentaContable: string;
   anno: number;
}

export interface IResponseGetDataIndicators {
   centroCosto: string;
   montoDelProyectoUSD: number;
   montoDelProyectoMonedaLocal: number;
   ingresosAcumulados: number;
   ingresosAnnoActual: number;
   ingresosProyectadosAnnoActual: number;
   ingresosProyectadosAnnoPosterior: number;
   ingresosProyectadosTotal: number;
   costosAcumulados: number;
   costosAnnoActual: number;
   costosProyectadosAnnoActual: number;
   costosProyectadosAnnoPosterior: number;
   costosProyectadosTotal: number;
   margenDeAperturaPorcentual: number;
   margenAcumuladoPorcentual: number;
   margenAnnoActualPorcentual: number;
   margenProyectadoAnnoActualPorcentual: number;
   margenProyectadoAnnoPosteriorPorcentual: number;
   margenProyectadoDeCierrePorcentual: number;
   margenDeAperturaMonetario: number;
   margenAcumuladoMonetario: number;
   margenAnnoActualMonetario: number;
   margenProyectadoAnnoActualMonetario: number;
   margenProyectadoAnnoPosteriorMonetario: number;
   margenProyectadoDeCierreMonetario: number;
}

export interface IBodyCloseAccountingMonth {
   mesNumero: number;
   anno: number;
   usuarioQuecierraMes: string;
}
