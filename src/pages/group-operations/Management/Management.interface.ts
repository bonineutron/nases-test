import { IField } from '@/interfaces/global.interface';

export interface IFormManagement {
   executor: IField<string>;
   ceco: IField<string>;
}

export interface IDataDetail {
   dataName: {
      title: string;
   };
   dataId: {
      ceco: string;
   };
   dataInfo: {
      hub: string;
      type: string;
   };
   dataLocation: {
      country: string;
      currency: string;
   };
}

export interface IIncomeCost {
   year: number;
   description: string;
   january: number;
   february: number;
   march: number;
   april: number;
   may: number;
   june: number;
   july: number;
   august: number;
   september: number;
   october: number;
   november: number;
   december: number;
   total: number;
}

export interface IDataIncomeToBeExecuted {
   totalAmountExecuted: number;
   totalAmountExecutedPreviousyears: number;
   totalAmountProjectedSubsequentYears: number;
   totalAmountProjected: number;
   lastModifiedBy: string;
   date: string;
}

export interface IRowIncomeToBeExecuted {
   january: IInputRowAddIncomeCost;
   february: IInputRowAddIncomeCost;
   march: IInputRowAddIncomeCost;
   april: IInputRowAddIncomeCost;
   may: IInputRowAddIncomeCost;
   june: IInputRowAddIncomeCost;
   july: IInputRowAddIncomeCost;
   august: IInputRowAddIncomeCost;
   september: IInputRowAddIncomeCost;
   october: IInputRowAddIncomeCost;
   november: IInputRowAddIncomeCost;
   december: IInputRowAddIncomeCost;
}

export interface IInputRowAddIncomeCost {
   value: number;
   disabled: boolean;
}

export interface IRowCostToBeExecuted {
   id: number;
   accountingAccountSlug: string;
   accountingAccount: string;
   january: IInputRowAddIncomeCost;
   february: IInputRowAddIncomeCost;
   march: IInputRowAddIncomeCost;
   april: IInputRowAddIncomeCost;
   may: IInputRowAddIncomeCost;
   june: IInputRowAddIncomeCost;
   july: IInputRowAddIncomeCost;
   august: IInputRowAddIncomeCost;
   september: IInputRowAddIncomeCost;
   october: IInputRowAddIncomeCost;
   november: IInputRowAddIncomeCost;
   december: IInputRowAddIncomeCost;
   total: { value: number };
}

export interface IValuesIncomesToBeExecuted {
   totalProjectAmount: number;
   projectedClosingMargin: number;
   hub: string;
   sourceIncome: string;
}
