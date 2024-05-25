/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateAccount } from '../fn/bank-account-controller/activate-account';
import { ActivateAccount$Params } from '../fn/bank-account-controller/activate-account';
import { BankAccountDto } from '../models/bank-account-dto';
import { deactivateAccount } from '../fn/bank-account-controller/deactivate-account';
import { DeactivateAccount$Params } from '../fn/bank-account-controller/deactivate-account';
import { deleteAccount } from '../fn/bank-account-controller/delete-account';
import { DeleteAccount$Params } from '../fn/bank-account-controller/delete-account';
import { getAllAccountsNotAdmin } from '../fn/bank-account-controller/get-all-accounts-not-admin';
import { GetAllAccountsNotAdmin$Params } from '../fn/bank-account-controller/get-all-accounts-not-admin';
import { getBalance } from '../fn/bank-account-controller/get-balance';
import { GetBalance$Params } from '../fn/bank-account-controller/get-balance';
import { getSpecificAccount } from '../fn/bank-account-controller/get-specific-account';
import { GetSpecificAccount$Params } from '../fn/bank-account-controller/get-specific-account';
import { getUserAccounts } from '../fn/bank-account-controller/get-user-accounts';
import { GetUserAccounts$Params } from '../fn/bank-account-controller/get-user-accounts';
import { openAccount } from '../fn/bank-account-controller/open-account';
import { OpenAccount$Params } from '../fn/bank-account-controller/open-account';

@Injectable({ providedIn: 'root' })
export class BankAccountControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `deactivateAccount()` */
  static readonly DeactivateAccountPath = '/user/accounts/{accountId}/deactivate';

  /**
   * deactivate account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deactivateAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  deactivateAccount$Response(params: DeactivateAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deactivateAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * deactivate account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deactivateAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deactivateAccount(params: DeactivateAccount$Params, context?: HttpContext): Observable<string> {
    return this.deactivateAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `activateAccount()` */
  static readonly ActivateAccountPath = '/user/accounts/{accountId}/activate';

  /**
   * Activate account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount$Response(params: ActivateAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return activateAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Activate account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount(params: ActivateAccount$Params, context?: HttpContext): Observable<string> {
    return this.activateAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `openAccount()` */
  static readonly OpenAccountPath = '/user/accounts/open';

  /**
   * Open a new bank account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `openAccount()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  openAccount$Response(params: OpenAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return openAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Open a new bank account.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `openAccount$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  openAccount(params: OpenAccount$Params, context?: HttpContext): Observable<{
}> {
    return this.openAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getSpecificAccount()` */
  static readonly GetSpecificAccountPath = '/user/accounts/{accountId}';

  /**
   * Get specific account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSpecificAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSpecificAccount$Response(params: GetSpecificAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<BankAccountDto>> {
    return getSpecificAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Get specific account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSpecificAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSpecificAccount(params: GetSpecificAccount$Params, context?: HttpContext): Observable<BankAccountDto> {
    return this.getSpecificAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<BankAccountDto>): BankAccountDto => r.body)
    );
  }

  /** Path part for operation `getBalance()` */
  static readonly GetBalancePath = '/user/accounts/{accountId}/balance';

  /**
   * Get account balance.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBalance()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBalance$Response(params: GetBalance$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getBalance(this.http, this.rootUrl, params, context);
  }

  /**
   * Get account balance.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBalance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBalance(params: GetBalance$Params, context?: HttpContext): Observable<{
}> {
    return this.getBalance$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllAccountsNotAdmin()` */
  static readonly GetAllAccountsNotAdminPath = '/user/accounts/accounts';

  /**
   * Get all accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAccountsNotAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAccountsNotAdmin$Response(params?: GetAllAccountsNotAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
    return getAllAccountsNotAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAccountsNotAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAccountsNotAdmin(params?: GetAllAccountsNotAdmin$Params, context?: HttpContext): Observable<Array<BankAccountDto>> {
    return this.getAllAccountsNotAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BankAccountDto>>): Array<BankAccountDto> => r.body)
    );
  }

  /** Path part for operation `getUserAccounts()` */
  static readonly GetUserAccountsPath = '/user/accounts/';

  /**
   * Get user accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserAccounts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserAccounts$Response(params?: GetUserAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
    return getUserAccounts(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserAccounts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserAccounts(params?: GetUserAccounts$Params, context?: HttpContext): Observable<Array<BankAccountDto>> {
    return this.getUserAccounts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BankAccountDto>>): Array<BankAccountDto> => r.body)
    );
  }

  /** Path part for operation `deleteAccount()` */
  static readonly DeleteAccountPath = '/user/accounts/{accountId}/delete';

  /**
   * delete account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccount$Response(params: DeleteAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * delete account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccount(params: DeleteAccount$Params, context?: HttpContext): Observable<string> {
    return this.deleteAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
