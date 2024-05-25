/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCheckbook } from '../fn/checkbook-controller/add-checkbook';
import { AddCheckbook$Params } from '../fn/checkbook-controller/add-checkbook';
import { CheckbookDto } from '../models/checkbook-dto';
import { getCheckbookByUserId } from '../fn/checkbook-controller/get-checkbook-by-user-id';
import { GetCheckbookByUserId$Params } from '../fn/checkbook-controller/get-checkbook-by-user-id';
import { getCheckbookByUserId1 } from '../fn/checkbook-controller/get-checkbook-by-user-id-1';
import { GetCheckbookByUserId1$Params } from '../fn/checkbook-controller/get-checkbook-by-user-id-1';

@Injectable({ providedIn: 'root' })
export class CheckbookControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addCheckbook()` */
  static readonly AddCheckbookPath = '/user/checkbooks/request-checkbook';

  /**
   * Request a new checkbook.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCheckbook()` instead.
   *
   * This method doesn't expect any request body.
   */
  addCheckbook$Response(params?: AddCheckbook$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addCheckbook(this.http, this.rootUrl, params, context);
  }

  /**
   * Request a new checkbook.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCheckbook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addCheckbook(params?: AddCheckbook$Params, context?: HttpContext): Observable<{
}> {
    return this.addCheckbook$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getCheckbookByUserId()` */
  static readonly GetCheckbookByUserIdPath = '/user/checkbooks/{checkbookId}';

  /**
   * Get checkbook by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCheckbookByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCheckbookByUserId$Response(params: GetCheckbookByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckbookDto>> {
    return getCheckbookByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * Get checkbook by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCheckbookByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCheckbookByUserId(params: GetCheckbookByUserId$Params, context?: HttpContext): Observable<CheckbookDto> {
    return this.getCheckbookByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckbookDto>): CheckbookDto => r.body)
    );
  }

  /** Path part for operation `getCheckbookByUserId1()` */
  static readonly GetCheckbookByUserId1Path = '/user/checkbooks/';

  /**
   * Get all checkbooks by user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCheckbookByUserId1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCheckbookByUserId1$Response(params?: GetCheckbookByUserId1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CheckbookDto>>> {
    return getCheckbookByUserId1(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all checkbooks by user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCheckbookByUserId1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCheckbookByUserId1(params?: GetCheckbookByUserId1$Params, context?: HttpContext): Observable<Array<CheckbookDto>> {
    return this.getCheckbookByUserId1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CheckbookDto>>): Array<CheckbookDto> => r.body)
    );
  }

}
