/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CreditDto } from '../models/credit-dto';
import { getAllRepaymentsByUser } from '../fn/credit-controller/get-all-repayments-by-user';
import { GetAllRepaymentsByUser$Params } from '../fn/credit-controller/get-all-repayments-by-user';
import { getDuePayments } from '../fn/credit-controller/get-due-payments';
import { GetDuePayments$Params } from '../fn/credit-controller/get-due-payments';
import { getLoanById } from '../fn/credit-controller/get-loan-by-id';
import { GetLoanById$Params } from '../fn/credit-controller/get-loan-by-id';
import { getLoans } from '../fn/credit-controller/get-loans';
import { GetLoans$Params } from '../fn/credit-controller/get-loans';
import { getPaidPayments } from '../fn/credit-controller/get-paid-payments';
import { GetPaidPayments$Params } from '../fn/credit-controller/get-paid-payments';
import { ongoingLoans } from '../fn/credit-controller/ongoing-loans';
import { OngoingLoans$Params } from '../fn/credit-controller/ongoing-loans';
import { RepaymentDetailDto } from '../models/repayment-detail-dto';
import { requestLoan } from '../fn/credit-controller/request-loan';
import { RequestLoan$Params } from '../fn/credit-controller/request-loan';

@Injectable({ providedIn: 'root' })
export class CreditControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `requestLoan()` */
  static readonly RequestLoanPath = '/user/loans/request-loan';

  /**
   * Request a new loan.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestLoan()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  requestLoan$Response(params: RequestLoan$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return requestLoan(this.http, this.rootUrl, params, context);
  }

  /**
   * Request a new loan.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestLoan$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  requestLoan(params: RequestLoan$Params, context?: HttpContext): Observable<{
}> {
    return this.requestLoan$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getLoanById()` */
  static readonly GetLoanByIdPath = '/user/loans/{creditId}';

  /**
   * Get loan by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoanById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoanById$Response(params: GetLoanById$Params, context?: HttpContext): Observable<StrictHttpResponse<CreditDto>> {
    return getLoanById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get loan by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLoanById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoanById(params: GetLoanById$Params, context?: HttpContext): Observable<CreditDto> {
    return this.getLoanById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CreditDto>): CreditDto => r.body)
    );
  }

  /** Path part for operation `getDuePayments()` */
  static readonly GetDuePaymentsPath = '/user/loans/{creditId}/due-payments';

  /**
   * Get due payments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDuePayments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDuePayments$Response(params: GetDuePayments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RepaymentDetailDto>>> {
    return getDuePayments(this.http, this.rootUrl, params, context);
  }

  /**
   * Get due payments.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDuePayments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDuePayments(params: GetDuePayments$Params, context?: HttpContext): Observable<Array<RepaymentDetailDto>> {
    return this.getDuePayments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RepaymentDetailDto>>): Array<RepaymentDetailDto> => r.body)
    );
  }

  /** Path part for operation `getAllRepaymentsByUser()` */
  static readonly GetAllRepaymentsByUserPath = '/user/loans/{creditId}/all-payments';

  /**
   * Get all payments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRepaymentsByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRepaymentsByUser$Response(params: GetAllRepaymentsByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RepaymentDetailDto>>> {
    return getAllRepaymentsByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all payments.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRepaymentsByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRepaymentsByUser(params: GetAllRepaymentsByUser$Params, context?: HttpContext): Observable<Array<RepaymentDetailDto>> {
    return this.getAllRepaymentsByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RepaymentDetailDto>>): Array<RepaymentDetailDto> => r.body)
    );
  }

  /** Path part for operation `getPaidPayments()` */
  static readonly GetPaidPaymentsPath = '/user/loans/{crediId}/paid-payments';

  /**
   * Get paid payments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaidPayments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaidPayments$Response(params: GetPaidPayments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RepaymentDetailDto>>> {
    return getPaidPayments(this.http, this.rootUrl, params, context);
  }

  /**
   * Get paid payments.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaidPayments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaidPayments(params: GetPaidPayments$Params, context?: HttpContext): Observable<Array<RepaymentDetailDto>> {
    return this.getPaidPayments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RepaymentDetailDto>>): Array<RepaymentDetailDto> => r.body)
    );
  }

  /** Path part for operation `ongoingLoans()` */
  static readonly OngoingLoansPath = '/user/loans/ongoing-loans';

  /**
   * ongoing payments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ongoingLoans()` instead.
   *
   * This method doesn't expect any request body.
   */
  ongoingLoans$Response(params?: OngoingLoans$Params, context?: HttpContext): Observable<StrictHttpResponse<CreditDto>> {
    return ongoingLoans(this.http, this.rootUrl, params, context);
  }

  /**
   * ongoing payments.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ongoingLoans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ongoingLoans(params?: OngoingLoans$Params, context?: HttpContext): Observable<CreditDto> {
    return this.ongoingLoans$Response(params, context).pipe(
      map((r: StrictHttpResponse<CreditDto>): CreditDto => r.body)
    );
  }

  /** Path part for operation `getLoans()` */
  static readonly GetLoansPath = '/user/loans/';

  /**
   * Get all loans by user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoans()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoans$Response(params?: GetLoans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CreditDto>>> {
    return getLoans(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all loans by user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLoans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoans(params?: GetLoans$Params, context?: HttpContext): Observable<Array<CreditDto>> {
    return this.getLoans$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CreditDto>>): Array<CreditDto> => r.body)
    );
  }

}
