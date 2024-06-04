/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateAccount1 } from '../fn/admin-controller/activate-account-1';
import { ActivateAccount1$Params } from '../fn/admin-controller/activate-account-1';
import { activateCard1 } from '../fn/admin-controller/activate-card-1';
import { ActivateCard1$Params } from '../fn/admin-controller/activate-card-1';
import { approveCard } from '../fn/admin-controller/approve-card';
import { ApproveCard$Params } from '../fn/admin-controller/approve-card';
import { approveCredit } from '../fn/admin-controller/approve-credit';
import { ApproveCredit$Params } from '../fn/admin-controller/approve-credit';
import { BankAccountDto } from '../models/bank-account-dto';
import { CardDto } from '../models/card-dto';
import { CheckbookDto } from '../models/checkbook-dto';
import { checkbookRequests } from '../fn/admin-controller/checkbook-requests';
import { CheckbookRequests$Params } from '../fn/admin-controller/checkbook-requests';
import { closeAccount } from '../fn/admin-controller/close-account';
import { CloseAccount$Params } from '../fn/admin-controller/close-account';
import { CreditDto } from '../models/credit-dto';
import { creditRequests } from '../fn/admin-controller/credit-requests';
import { CreditRequests$Params } from '../fn/admin-controller/credit-requests';
import { deactivateCard1 } from '../fn/admin-controller/deactivate-card-1';
import { DeactivateCard1$Params } from '../fn/admin-controller/deactivate-card-1';
import { deleteCard1 } from '../fn/admin-controller/delete-card-1';
import { DeleteCard1$Params } from '../fn/admin-controller/delete-card-1';
import { deleteUser1 } from '../fn/admin-controller/delete-user-1';
import { DeleteUser1$Params } from '../fn/admin-controller/delete-user-1';
import { freezeAccount } from '../fn/admin-controller/freeze-account';
import { FreezeAccount$Params } from '../fn/admin-controller/freeze-account';
import { getAccountById } from '../fn/admin-controller/get-account-by-id';
import { GetAccountById$Params } from '../fn/admin-controller/get-account-by-id';
import { getAllAccounts } from '../fn/admin-controller/get-all-accounts';
import { GetAllAccounts$Params } from '../fn/admin-controller/get-all-accounts';
import { getAllCards } from '../fn/admin-controller/get-all-cards';
import { GetAllCards$Params } from '../fn/admin-controller/get-all-cards';
import { getAllLoans } from '../fn/admin-controller/get-all-loans';
import { GetAllLoans$Params } from '../fn/admin-controller/get-all-loans';
import { getAllTrans } from '../fn/admin-controller/get-all-trans';
import { GetAllTrans$Params } from '../fn/admin-controller/get-all-trans';
import { getAllTransactions } from '../fn/admin-controller/get-all-transactions';
import { GetAllTransactions$Params } from '../fn/admin-controller/get-all-transactions';
import { getAllUsers } from '../fn/admin-controller/get-all-users';
import { GetAllUsers$Params } from '../fn/admin-controller/get-all-users';
import { getCheckingAccounts } from '../fn/admin-controller/get-checking-accounts';
import { GetCheckingAccounts$Params } from '../fn/admin-controller/get-checking-accounts';
import { getInstallments } from '../fn/admin-controller/get-installments';
import { GetInstallments$Params } from '../fn/admin-controller/get-installments';
import { getPendingAccounts } from '../fn/admin-controller/get-pending-accounts';
import { GetPendingAccounts$Params } from '../fn/admin-controller/get-pending-accounts';
import { getPendingCards } from '../fn/admin-controller/get-pending-cards';
import { GetPendingCards$Params } from '../fn/admin-controller/get-pending-cards';
import { getSavingsAccounts } from '../fn/admin-controller/get-savings-accounts';
import { GetSavingsAccounts$Params } from '../fn/admin-controller/get-savings-accounts';
import { getTransaction } from '../fn/admin-controller/get-transaction';
import { GetTransaction$Params } from '../fn/admin-controller/get-transaction';
import { getUserById } from '../fn/admin-controller/get-user-by-id';
import { GetUserById$Params } from '../fn/admin-controller/get-user-by-id';
import { PageResponseTransactionDto } from '../models/page-response-transaction-dto';
import { rejectAccount } from '../fn/admin-controller/reject-account';
import { RejectAccount$Params } from '../fn/admin-controller/reject-account';
import { rejectCard } from '../fn/admin-controller/reject-card';
import { RejectCard$Params } from '../fn/admin-controller/reject-card';
import { rejectCredit } from '../fn/admin-controller/reject-credit';
import { RejectCredit$Params } from '../fn/admin-controller/reject-credit';
import { RepaymentDetailDto } from '../models/repayment-detail-dto';
import { TransactionDto } from '../models/transaction-dto';
import { updateCheckbookStatus } from '../fn/admin-controller/update-checkbook-status';
import { UpdateCheckbookStatus$Params } from '../fn/admin-controller/update-checkbook-status';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class AdminControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rejectCredit()` */
  static readonly RejectCreditPath = '/admin/credit-requests/{creditId}/reject';

  /**
   * Reject credit request by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejectCredit()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectCredit$Response(params: RejectCredit$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return rejectCredit(this.http, this.rootUrl, params, context);
  }

  /**
   * Reject credit request by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rejectCredit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectCredit(params: RejectCredit$Params, context?: HttpContext): Observable<string> {
    return this.rejectCredit$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `rejectCard()` */
  static readonly RejectCardPath = '/admin/cards/{cardId}/reject';

  /**
   * Reject card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejectCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectCard$Response(params: RejectCard$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return rejectCard(this.http, this.rootUrl, params, context);
  }

  /**
   * Reject card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rejectCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectCard(params: RejectCard$Params, context?: HttpContext): Observable<string> {
    return this.rejectCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `deactivateCard1()` */
  static readonly DeactivateCard1Path = '/admin/cards/{cardId}/deactivate';

  /**
   * Deactivate card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deactivateCard1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deactivateCard1$Response(params: DeactivateCard1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deactivateCard1(this.http, this.rootUrl, params, context);
  }

  /**
   * Deactivate card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deactivateCard1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deactivateCard1(params: DeactivateCard1$Params, context?: HttpContext): Observable<string> {
    return this.deactivateCard1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `approveCard()` */
  static readonly ApproveCardPath = '/admin/cards/{cardId}/approve';

  /**
   * Approve card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveCard$Response(params: ApproveCard$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return approveCard(this.http, this.rootUrl, params, context);
  }

  /**
   * Approve card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveCard(params: ApproveCard$Params, context?: HttpContext): Observable<string> {
    return this.approveCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `activateCard1()` */
  static readonly ActivateCard1Path = '/admin/cards/{cardId}/activate';

  /**
   * Activate card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateCard1()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateCard1$Response(params: ActivateCard1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return activateCard1(this.http, this.rootUrl, params, context);
  }

  /**
   * Activate card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateCard1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateCard1(params: ActivateCard1$Params, context?: HttpContext): Observable<string> {
    return this.activateCard1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `freezeAccount()` */
  static readonly FreezeAccountPath = '/admin/accounts/{accountId}/freeze';

  /**
   * Freeze account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `freezeAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  freezeAccount$Response(params: FreezeAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return freezeAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Freeze account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `freezeAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  freezeAccount(params: FreezeAccount$Params, context?: HttpContext): Observable<string> {
    return this.freezeAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `rejectAccount()` */
  static readonly RejectAccountPath = '/admin/accounts/{accountId}/deactivate';

  /**
   * Reject account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejectAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectAccount$Response(params: RejectAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return rejectAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Reject account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rejectAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectAccount(params: RejectAccount$Params, context?: HttpContext): Observable<string> {
    return this.rejectAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `approveCredit()` */
  static readonly ApproveCreditPath = '/admin/credit-requests/{creditId}/approve';

  /**
   * Approve credit request by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveCredit()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveCredit$Response(params: ApproveCredit$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return approveCredit(this.http, this.rootUrl, params, context);
  }

  /**
   * Approve credit request by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveCredit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveCredit(params: ApproveCredit$Params, context?: HttpContext): Observable<string> {
    return this.approveCredit$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `updateCheckbookStatus()` */
  static readonly UpdateCheckbookStatusPath = '/admin/checkbook/{checkId}/update/{checkbookStatus}';

  /**
   * update checkbook status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCheckbookStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCheckbookStatus$Response(params: UpdateCheckbookStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateCheckbookStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * update checkbook status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCheckbookStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCheckbookStatus(params: UpdateCheckbookStatus$Params, context?: HttpContext): Observable<string> {
    return this.updateCheckbookStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `activateAccount1()` */
  static readonly ActivateAccount1Path = '/admin/accounts/{accountId}/activate';

  /**
   * Activate account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateAccount1()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount1$Response(params: ActivateAccount1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return activateAccount1(this.http, this.rootUrl, params, context);
  }

  /**
   * Activate account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateAccount1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount1(params: ActivateAccount1$Params, context?: HttpContext): Observable<string> {
    return this.activateAccount1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/admin/users';

  /**
   * Get all users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all users.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/admin/users/{userId}';

  /**
   * Get user by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<UserDto> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getAllTransactions()` */
  static readonly GetAllTransactionsPath = '/admin/transactions';

  /**
   * Get all transactions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTransactions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransactions$Response(params?: GetAllTransactions$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTransactionDto>> {
    return getAllTransactions(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all transactions.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTransactions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransactions(params?: GetAllTransactions$Params, context?: HttpContext): Observable<PageResponseTransactionDto> {
    return this.getAllTransactions$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseTransactionDto>): PageResponseTransactionDto => r.body)
    );
  }

  /** Path part for operation `getTransaction()` */
  static readonly GetTransactionPath = '/admin/transactions/{transactionId}';

  /**
   * Get transaction by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTransaction()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransaction$Response(params: GetTransaction$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionDto>> {
    return getTransaction(this.http, this.rootUrl, params, context);
  }

  /**
   * Get transaction by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTransaction$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransaction(params: GetTransaction$Params, context?: HttpContext): Observable<TransactionDto> {
    return this.getTransaction$Response(params, context).pipe(
      map((r: StrictHttpResponse<TransactionDto>): TransactionDto => r.body)
    );
  }

  /** Path part for operation `getAllTrans()` */
  static readonly GetAllTransPath = '/admin/transactions/noPage';

  /**
   * Get all transactions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTrans()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrans$Response(params?: GetAllTrans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TransactionDto>>> {
    return getAllTrans(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all transactions.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTrans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrans(params?: GetAllTrans$Params, context?: HttpContext): Observable<Array<TransactionDto>> {
    return this.getAllTrans$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TransactionDto>>): Array<TransactionDto> => r.body)
    );
  }

  /** Path part for operation `getAllLoans()` */
  static readonly GetAllLoansPath = '/admin/loans';

  /**
   * Get all loans.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLoans()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLoans$Response(params?: GetAllLoans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CreditDto>>> {
    return getAllLoans(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all loans.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllLoans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLoans(params?: GetAllLoans$Params, context?: HttpContext): Observable<Array<CreditDto>> {
    return this.getAllLoans$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CreditDto>>): Array<CreditDto> => r.body)
    );
  }

  /** Path part for operation `getInstallments()` */
  static readonly GetInstallmentsPath = '/admin/loans/{creditId}/installments';

  /**
   * Get credit installments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInstallments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInstallments$Response(params: GetInstallments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RepaymentDetailDto>>> {
    return getInstallments(this.http, this.rootUrl, params, context);
  }

  /**
   * Get credit installments.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInstallments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInstallments(params: GetInstallments$Params, context?: HttpContext): Observable<Array<RepaymentDetailDto>> {
    return this.getInstallments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RepaymentDetailDto>>): Array<RepaymentDetailDto> => r.body)
    );
  }

  /** Path part for operation `creditRequests()` */
  static readonly CreditRequestsPath = '/admin/credit-requests';

  /**
   * Get all credit requests.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `creditRequests()` instead.
   *
   * This method doesn't expect any request body.
   */
  creditRequests$Response(params?: CreditRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CreditDto>>> {
    return creditRequests(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all credit requests.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `creditRequests$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  creditRequests(params?: CreditRequests$Params, context?: HttpContext): Observable<Array<CreditDto>> {
    return this.creditRequests$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CreditDto>>): Array<CreditDto> => r.body)
    );
  }

  /** Path part for operation `checkbookRequests()` */
  static readonly CheckbookRequestsPath = '/admin/checkbook-requests';

  /**
   * Get all checkbook requests.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkbookRequests()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkbookRequests$Response(params?: CheckbookRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CheckbookDto>>> {
    return checkbookRequests(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all checkbook requests.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkbookRequests$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkbookRequests(params?: CheckbookRequests$Params, context?: HttpContext): Observable<Array<CheckbookDto>> {
    return this.checkbookRequests$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CheckbookDto>>): Array<CheckbookDto> => r.body)
    );
  }

  /** Path part for operation `getAllCards()` */
  static readonly GetAllCardsPath = '/admin/cards';

  /**
   * Get all cards.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCards()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCards$Response(params?: GetAllCards$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardDto>>> {
    return getAllCards(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all cards.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCards(params?: GetAllCards$Params, context?: HttpContext): Observable<Array<CardDto>> {
    return this.getAllCards$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardDto>>): Array<CardDto> => r.body)
    );
  }

  /** Path part for operation `getPendingCards()` */
  static readonly GetPendingCardsPath = '/admin/cards/pending';

  /**
   * Get all pending cards.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPendingCards()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPendingCards$Response(params?: GetPendingCards$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardDto>>> {
    return getPendingCards(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all pending cards.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPendingCards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPendingCards(params?: GetPendingCards$Params, context?: HttpContext): Observable<Array<CardDto>> {
    return this.getPendingCards$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardDto>>): Array<CardDto> => r.body)
    );
  }

  /** Path part for operation `getAllAccounts()` */
  static readonly GetAllAccountsPath = '/admin/accounts';

  /**
   * Get all accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAccounts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAccounts$Response(params?: GetAllAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
    return getAllAccounts(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAccounts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAccounts(params?: GetAllAccounts$Params, context?: HttpContext): Observable<Array<BankAccountDto>> {
    return this.getAllAccounts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BankAccountDto>>): Array<BankAccountDto> => r.body)
    );
  }

  /** Path part for operation `getAccountById()` */
  static readonly GetAccountByIdPath = '/admin/accounts/{accountId}';

  /**
   * Get account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAccountById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccountById$Response(params: GetAccountById$Params, context?: HttpContext): Observable<StrictHttpResponse<BankAccountDto>> {
    return getAccountById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAccountById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccountById(params: GetAccountById$Params, context?: HttpContext): Observable<BankAccountDto> {
    return this.getAccountById$Response(params, context).pipe(
      map((r: StrictHttpResponse<BankAccountDto>): BankAccountDto => r.body)
    );
  }

  /** Path part for operation `getSavingsAccounts()` */
  static readonly GetSavingsAccountsPath = '/admin/accounts/savings';

  /**
   * Get all savings accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSavingsAccounts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSavingsAccounts$Response(params?: GetSavingsAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
    return getSavingsAccounts(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all savings accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSavingsAccounts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSavingsAccounts(params?: GetSavingsAccounts$Params, context?: HttpContext): Observable<Array<BankAccountDto>> {
    return this.getSavingsAccounts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BankAccountDto>>): Array<BankAccountDto> => r.body)
    );
  }

  /** Path part for operation `getPendingAccounts()` */
  static readonly GetPendingAccountsPath = '/admin/accounts/pending';

  /**
   * Get all pending accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPendingAccounts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPendingAccounts$Response(params?: GetPendingAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
    return getPendingAccounts(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all pending accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPendingAccounts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPendingAccounts(params?: GetPendingAccounts$Params, context?: HttpContext): Observable<Array<BankAccountDto>> {
    return this.getPendingAccounts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BankAccountDto>>): Array<BankAccountDto> => r.body)
    );
  }

  /** Path part for operation `getCheckingAccounts()` */
  static readonly GetCheckingAccountsPath = '/admin/accounts/checking';

  /**
   * Get all checking accounts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCheckingAccounts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCheckingAccounts$Response(params?: GetCheckingAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
    return getCheckingAccounts(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all checking accounts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCheckingAccounts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCheckingAccounts(params?: GetCheckingAccounts$Params, context?: HttpContext): Observable<Array<BankAccountDto>> {
    return this.getCheckingAccounts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BankAccountDto>>): Array<BankAccountDto> => r.body)
    );
  }

  /** Path part for operation `deleteUser1()` */
  static readonly DeleteUser1Path = '/admin/users/{userId}/delete';

  /**
   * Delete user by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser1$Response(params: DeleteUser1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteUser1(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete user by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser1(params: DeleteUser1$Params, context?: HttpContext): Observable<string> {
    return this.deleteUser1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `deleteCard1()` */
  static readonly DeleteCard1Path = '/admin/cards/{cardId}/delete';

  /**
   * Delete card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCard1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCard1$Response(params: DeleteCard1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteCard1(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCard1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCard1(params: DeleteCard1$Params, context?: HttpContext): Observable<string> {
    return this.deleteCard1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `closeAccount()` */
  static readonly CloseAccountPath = '/admin/accounts/{accountId}/close';

  /**
   * Close account by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `closeAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  closeAccount$Response(params: CloseAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return closeAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Close account by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `closeAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  closeAccount(params: CloseAccount$Params, context?: HttpContext): Observable<string> {
    return this.closeAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
