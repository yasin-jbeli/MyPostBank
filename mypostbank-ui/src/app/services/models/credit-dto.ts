/* tslint:disable */
/* eslint-disable */
export interface CreditDto {
  account?: number;
  amount?: number;
  createdOn?: string;
  duration?: number;
  id?: number;
  interestRate?: number;
  owner?: string;
  status?: 'ONGOING' | 'PENDING' | 'REJECTED' | 'PAID';
}
