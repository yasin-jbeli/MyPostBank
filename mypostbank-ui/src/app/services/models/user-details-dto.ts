/* tslint:disable */
/* eslint-disable */
export interface UserDetailsDto {
  accounts?: Array<string>;
  cards?: Array<string>;
  dateJoined?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'USER' | 'ADMIN' | 'MANAGER';
}
