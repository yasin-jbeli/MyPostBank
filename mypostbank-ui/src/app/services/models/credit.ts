/* tslint:disable */
/* eslint-disable */
import { BankAccount } from '../models/bank-account';
import { FileEntity } from '../models/file-entity';
import { RepaymentDetail } from '../models/repayment-detail';
import { User } from '../models/user';
export interface Credit {
  account?: BankAccount;
  amount?: number;
  createdBy?: number;
  createdDate?: string;
  duration?: number;
  files?: Array<FileEntity>;
  id?: number;
  interestRate?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  repaymentDetails?: Array<RepaymentDetail>;
  status?: 'ONGOING' | 'PENDING' | 'REJECTED' | 'PAID';
  user?: User;
}
