/* tslint:disable */
/* eslint-disable */
import { Card } from '../models/card';
import { Credit } from '../models/credit';
import { User } from '../models/user';
export interface BankAccount {
  accountNo?: string;
  accountType?: 'CHECKING' | 'SAVINGS';
  balance?: number;
  cards?: Array<Card>;
  createdBy?: number;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  loans?: Array<Credit>;
  status?: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'FROZEN';
  user?: User;
}
