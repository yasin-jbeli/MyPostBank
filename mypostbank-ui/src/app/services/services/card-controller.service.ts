/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateCard } from '../fn/card-controller/activate-card';
import { ActivateCard$Params } from '../fn/card-controller/activate-card';
import { cancelCardRequest } from '../fn/card-controller/cancel-card-request';
import { CancelCardRequest$Params } from '../fn/card-controller/cancel-card-request';
import { CardDto } from '../models/card-dto';
import { deactivateCard } from '../fn/card-controller/deactivate-card';
import { DeactivateCard$Params } from '../fn/card-controller/deactivate-card';
import { deleteCard } from '../fn/card-controller/delete-card';
import { DeleteCard$Params } from '../fn/card-controller/delete-card';
import { getCardById } from '../fn/card-controller/get-card-by-id';
import { GetCardById$Params } from '../fn/card-controller/get-card-by-id';
import { getCardsByAccount } from '../fn/card-controller/get-cards-by-account';
import { GetCardsByAccount$Params } from '../fn/card-controller/get-cards-by-account';
import { getUserCards } from '../fn/card-controller/get-user-cards';
import { GetUserCards$Params } from '../fn/card-controller/get-user-cards';
import { requestCard } from '../fn/card-controller/request-card';
import { RequestCard$Params } from '../fn/card-controller/request-card';

@Injectable({ providedIn: 'root' })
export class CardControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `deactivateCard()` */
  static readonly DeactivateCardPath = '/user/cards/{cardId}/deactivate';

  /**
   * Deactivate card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deactivateCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  deactivateCard$Response(params: DeactivateCard$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deactivateCard(this.http, this.rootUrl, params, context);
  }

  /**
   * Deactivate card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deactivateCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deactivateCard(params: DeactivateCard$Params, context?: HttpContext): Observable<string> {
    return this.deactivateCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `activateCard()` */
  static readonly ActivateCardPath = '/user/cards/{cardId}/activate';

  /**
   * Activate card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateCard$Response(params: ActivateCard$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return activateCard(this.http, this.rootUrl, params, context);
  }

  /**
   * Activate card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateCard(params: ActivateCard$Params, context?: HttpContext): Observable<string> {
    return this.activateCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `requestCard()` */
  static readonly RequestCardPath = '/user/cards/request-card';

  /**
   * Request a new card for an account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestCard$Response(params: RequestCard$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return requestCard(this.http, this.rootUrl, params, context);
  }

  /**
   * Request a new card for an account.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestCard(params: RequestCard$Params, context?: HttpContext): Observable<string> {
    return this.requestCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getCardById()` */
  static readonly GetCardByIdPath = '/user/cards/{cardId}';

  /**
   * Get card by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardById$Response(params: GetCardById$Params, context?: HttpContext): Observable<StrictHttpResponse<CardDto>> {
    return getCardById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get card by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardById(params: GetCardById$Params, context?: HttpContext): Observable<CardDto> {
    return this.getCardById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CardDto>): CardDto => r.body)
    );
  }

  /** Path part for operation `getCardsByAccount()` */
  static readonly GetCardsByAccountPath = '/user/cards/{accountId}/all';

  /**
   * Get cards by account ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardsByAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardsByAccount$Response(params: GetCardsByAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardDto>>> {
    return getCardsByAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Get cards by account ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardsByAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardsByAccount(params: GetCardsByAccount$Params, context?: HttpContext): Observable<Array<CardDto>> {
    return this.getCardsByAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardDto>>): Array<CardDto> => r.body)
    );
  }

  /** Path part for operation `getUserCards()` */
  static readonly GetUserCardsPath = '/user/cards/';

  /**
   * Get all user cards.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserCards()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserCards$Response(params?: GetUserCards$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardDto>>> {
    return getUserCards(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all user cards.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserCards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserCards(params?: GetUserCards$Params, context?: HttpContext): Observable<Array<CardDto>> {
    return this.getUserCards$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardDto>>): Array<CardDto> => r.body)
    );
  }

  /** Path part for operation `deleteCard()` */
  static readonly DeleteCardPath = '/user/cards/{cardId}/delete';

  /**
   * delete card.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCard$Response(params?: DeleteCard$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteCard(this.http, this.rootUrl, params, context);
  }

  /**
   * delete card.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCard(params?: DeleteCard$Params, context?: HttpContext): Observable<string> {
    return this.deleteCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `cancelCardRequest()` */
  static readonly CancelCardRequestPath = '/user/cards/{cardId}/cancel-request';

  /**
   * Cancel card request by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelCardRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelCardRequest$Response(params: CancelCardRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return cancelCardRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * Cancel card request by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelCardRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelCardRequest(params: CancelCardRequest$Params, context?: HttpContext): Observable<string> {
    return this.cancelCardRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
