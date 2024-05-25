/* tslint:disable */
/* eslint-disable */
import { Credit } from '../models/credit';
import { User } from '../models/user';
export interface RepaymentDetail {
  createdBy?: number;
  createdDate?: string;
  credit?: Credit;
  dueDate?: string;
  id?: number;
  interestPayment?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  month?: number;
  paymentAmount?: number;
  paymentStatus?: 'PAID' | 'NOT_PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED' | 'INSUFFICIENT_FUNDS';
  principalPayment?: number;
  remainingBalance?: number;
  user?: User;
}
