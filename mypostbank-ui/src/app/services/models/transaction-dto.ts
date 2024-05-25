/* tslint:disable */
/* eslint-disable */
export interface TransactionDto {
  accountId?: number;
  amount?: number;
  beneficiary?: number;
  cardId?: number;
  date?: string;
  description?: string;
  id?: number;
  transactionType?: 'TRANSFER' | 'CARD_PAYMENT' | 'WITHDRAWAL' | 'DEPOSIT' | 'CREDIT_INSTALLMENT';
}
