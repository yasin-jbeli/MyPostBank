/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication-controller/authenticate';
import { Authenticate$Params } from '../fn/authentication-controller/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { confirm } from '../fn/authentication-controller/confirm';
import { Confirm$Params } from '../fn/authentication-controller/confirm';
import { refresh } from '../fn/authentication-controller/refresh';
import { Refresh$Params } from '../fn/authentication-controller/refresh';
import { register } from '../fn/authentication-controller/register';
import { Register$Params } from '../fn/authentication-controller/register';
import { resetPassword } from '../fn/authentication-controller/reset-password';
import { ResetPassword$Params } from '../fn/authentication-controller/reset-password';
import { sendResetEmail } from '../fn/authentication-controller/send-reset-email';
import { SendResetEmail$Params } from '../fn/authentication-controller/send-reset-email';

@Injectable({ providedIn: 'root' })
export class AuthenticationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sendResetEmail()` */
  static readonly SendResetEmailPath = '/send-reset-email';

  /**
   * Send password reset email.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendResetEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendResetEmail$Response(params: SendResetEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sendResetEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * Send password reset email.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendResetEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendResetEmail(params: SendResetEmail$Params, context?: HttpContext): Observable<void> {
    return this.sendResetEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/reset-password';

  /**
   * Reset password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<void> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/register';

  /**
   * Register a new user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * Register a new user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `refresh()` */
  static readonly RefreshPath = '/refresh';

  /**
   * Refresh authentication token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refresh()` instead.
   *
   * This method doesn't expect any request body.
   */
  refresh$Response(params?: Refresh$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return refresh(this.http, this.rootUrl, params, context);
  }

  /**
   * Refresh authentication token.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refresh$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refresh(params?: Refresh$Params, context?: HttpContext): Observable<void> {
    return this.refresh$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/authenticate';

  /**
   * Authenticate user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * Authenticate user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/activate-account';

  /**
   * Activate user account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * Activate user account.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
