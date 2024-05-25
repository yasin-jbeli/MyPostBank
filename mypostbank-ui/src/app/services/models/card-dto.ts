/* tslint:disable */
/* eslint-disable */
export interface CardDto {
  accountId?: number;
  cardId?: number;
  cardNo?: string;
  createDate?: string;
  expirationDate?: string;
  owner?: string;
  status?: 'PENDING' | 'FROZEN' | 'ACTIVE' | 'BLOCKED';
  userId?: number;
}
