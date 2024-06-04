/* tslint:disable */
/* eslint-disable */
export interface BankAccountDto {
  accountNo?: string;
  accountType?: 'CHECKING' | 'SAVINGS';
  balance?: number;
  cinFile?: Array<string>;
  createdDate?: string;
  id?: number;
  owner?: string;
  status?: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'FROZEN';
  userId?: number;
}
