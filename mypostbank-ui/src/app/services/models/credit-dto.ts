/* tslint:disable */
/* eslint-disable */
export interface CreditDto {
  account?: number;
  amount?: number;
  applicationForm?: Blob;
  bankStatements?: Blob;
  createdOn?: string;
  duration?: number;
  id?: number;
  interestRate?: number;
  owner?: string;
  proofOfIncome?: Blob;
  status?: 'ONGOING' | 'PENDING' | 'REJECTED' | 'PAID';
}
