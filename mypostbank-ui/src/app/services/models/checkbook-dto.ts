/* tslint:disable */
/* eslint-disable */
export interface CheckbookDto {
  checkbookNo?: string;
  createdOn?: string;
  id?: number;
  owner?: string;
  status?: 'ORDERED' | 'BEING_DELIVERED' | 'RECEIVED';
}
