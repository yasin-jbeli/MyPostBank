/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Notification {
  createdBy?: number;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  message?: string;
  read?: boolean;
  user?: User;
}
