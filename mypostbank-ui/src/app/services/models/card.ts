/* tslint:disable */
/* eslint-disable */
import { BankAccount } from '../models/bank-account';
import { User } from '../models/user';
export interface Card {
  account?: BankAccount;
  cardNo?: string;
  createdBy?: number;
  createdDate?: string;
  expirationDate?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  status?: 'PENDING' | 'FROZEN' | 'ACTIVE' | 'BLOCKED';
  user?: User;
}
