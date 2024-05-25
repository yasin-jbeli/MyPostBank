/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Checkbook {
  checkbookNo?: string;
  createdBy?: number;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  status?: 'ORDERED' | 'BEING_DELIVERED' | 'RECEIVED';
  user?: User;
}
