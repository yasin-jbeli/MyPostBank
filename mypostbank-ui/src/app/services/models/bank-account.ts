/* tslint:disable */
/* eslint-disable */
import { Card } from '../models/card';
import { Credit } from '../models/credit';
import { FileEntity } from '../models/file-entity';
import { User } from '../models/user';
export interface BankAccount {
  accountNo?: string;
  accountType?: 'CHECKING' | 'SAVINGS';
  balance?: number;
  cards?: Array<Card>;
  createdBy?: number;
  createdDate?: string;
  file?: FileEntity;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  loans?: Array<Credit>;
  status?: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'FROZEN';
  user?: User;
}
