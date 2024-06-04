/* tslint:disable */
/* eslint-disable */
import { BankAccount } from '../models/bank-account';
import { Credit } from '../models/credit';
export interface FileEntity {
  bankAccount?: BankAccount;
  credit?: Credit;
  fileData?: Array<string>;
  fileName?: string;
  fileType?: 'CREDIT' | 'CIN_FILE';
  id?: number;
}
