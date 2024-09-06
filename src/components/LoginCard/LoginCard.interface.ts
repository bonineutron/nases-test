import { IField } from '@/interfaces/global.interface';

export interface IFormLogin {
   email: IField<string>;
   password: IField<string>;
}

export interface IFormRegister {
   email: IField<string>;
   password: IField<string>;
   confirmPassword: IField<string>;
}
