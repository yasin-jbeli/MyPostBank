/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseTransactionDto } from '../../models/page-response-transaction-dto';

export interface GetTransactionsByUser$Params {
  page?: number;
  size?: number;
}

export function getTransactionsByUser(http: HttpClient, rootUrl: string, params?: GetTransactionsByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTransactionDto>> {
  const rb = new RequestBuilder(rootUrl, getTransactionsByUser.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseTransactionDto>;
    })
  );
}

getTransactionsByUser.PATH = '/user/transactions';
