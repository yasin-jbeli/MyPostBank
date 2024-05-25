/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changePassword } from '../fn/user-controller/change-password';
import { ChangePassword$Params } from '../fn/user-controller/change-password';
import { deleteUser } from '../fn/user-controller/delete-user';
import { DeleteUser$Params } from '../fn/user-controller/delete-user';
import { getTrans } from '../fn/user-controller/get-trans';
import { GetTrans$Params } from '../fn/user-controller/get-trans';
import { getTransactionById } from '../fn/user-controller/get-transaction-by-id';
import { GetTransactionById$Params } from '../fn/user-controller/get-transaction-by-id';
import { getTransactionsByUser } from '../fn/user-controller/get-transactions-by-user';
import { GetTransactionsByUser$Params } from '../fn/user-controller/get-transactions-by-user';
import { getUserDetails } from '../fn/user-controller/get-user-details';
import { GetUserDetails$Params } from '../fn/user-controller/get-user-details';
import { PageResponseTransactionDto } from '../models/page-response-transaction-dto';
import { TransactionDto } from '../models/transaction-dto';
import { transferFunds } from '../fn/user-controller/transfer-funds';
import { TransferFunds$Params } from '../fn/user-controller/transfer-funds';
import { updateUser } from '../fn/user-controller/update-user';
import { UpdateUser$Params } from '../fn/user-controller/update-user';
import { User } from '../models/user';
import { UserDetailsDto } from '../models/user-details-dto';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/user/update';

  /**
   * Update user details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user details.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<User> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `transferFunds()` */
  static readonly TransferFundsPath = '/user/transfer';

  /**
   * Transfer funds between accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transferFunds()` instead.
   *
   * This method doesn't expect any request body.
   */
  transferFunds$Response(params: TransferFunds$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return transferFunds(this.http, this.rootUrl, params, context);
  }

  /**
   * Transfer funds between accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `transferFunds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transferFunds(params: TransferFunds$Params, context?: HttpContext): Observable<{
}> {
    return this.transferFunds$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/user/change-password';

  /**
   * Change user password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Change user password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<{
}> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getTransactionsByUser()` */
  static readonly GetTransactionsByUserPath = '/user/transactions';

  /**
   * Get transactions by user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTransactionsByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransactionsByUser$Response(params?: GetTransactionsByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTransactionDto>> {
    return getTransactionsByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Get transactions by user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTransactionsByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransactionsByUser(params?: GetTransactionsByUser$Params, context?: HttpContext): Observable<PageResponseTransactionDto> {
    return this.getTransactionsByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseTransactionDto>): PageResponseTransactionDto => r.body)
    );
  }

  /** Path part for operation `getTransactionById()` */
  static readonly GetTransactionByIdPath = '/user/transactions/{transactionId}';

  /**
   * Get transaction by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTransactionById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransactionById$Response(params: GetTransactionById$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionDto>> {
    return getTransactionById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get transaction by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTransactionById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransactionById(params: GetTransactionById$Params, context?: HttpContext): Observable<TransactionDto> {
    return this.getTransactionById$Response(params, context).pipe(
      map((r: StrictHttpResponse<TransactionDto>): TransactionDto => r.body)
    );
  }

  /** Path part for operation `getTrans()` */
  static readonly GetTransPath = '/user/trans';

  /**
   * Get transaction by user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrans()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrans$Response(params?: GetTrans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TransactionDto>>> {
    return getTrans(this.http, this.rootUrl, params, context);
  }

  /**
   * Get transaction by user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrans(params?: GetTrans$Params, context?: HttpContext): Observable<Array<TransactionDto>> {
    return this.getTrans$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TransactionDto>>): Array<TransactionDto> => r.body)
    );
  }

  /** Path part for operation `getUserDetails()` */
  static readonly GetUserDetailsPath = '/user/details';

  /**
   * Get user details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetails$Response(params?: GetUserDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsDto>> {
    return getUserDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user details.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetails(params?: GetUserDetails$Params, context?: HttpContext): Observable<UserDetailsDto> {
    return this.getUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDetailsDto>): UserDetailsDto => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/user/delete';

  /**
   * Delete user account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params?: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete user account.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params?: DeleteUser$Params, context?: HttpContext): Observable<string> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
