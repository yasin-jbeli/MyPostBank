/* tslint:disable */
/* eslint-disable */
import { BankAccount } from '../models/bank-account';
import { Card } from '../models/card';
import { Checkbook } from '../models/checkbook';
import { Credit } from '../models/credit';
import { GrantedAuthority } from '../models/granted-authority';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  accounts?: Array<BankAccount>;
  authorities?: Array<GrantedAuthority>;
  cards?: Array<Card>;
  checkbooks?: Array<Checkbook>;
  createdBy?: number;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  lastName?: string;
  loans?: Array<Credit>;
  name?: string;
  password?: string;
  phone?: string;
  role?: 'USER' | 'ADMIN' | 'MANAGER';
  username?: string;
}
