/* tslint:disable */
/* eslint-disable */
import { TransactionDto } from '../models/transaction-dto';
export interface PageResponseTransactionDto {
  content?: Array<TransactionDto>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
