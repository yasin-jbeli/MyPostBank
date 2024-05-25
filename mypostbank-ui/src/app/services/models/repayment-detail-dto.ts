/* tslint:disable */
/* eslint-disable */
export interface RepaymentDetailDto {
  dueDate?: string;
  interestPayment?: number;
  month?: number;
  paymentAmount?: number;
  paymentStatus?: 'PAID' | 'NOT_PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED' | 'INSUFFICIENT_FUNDS';
  principalPayment?: number;
  remainingBalance?: number;
}
