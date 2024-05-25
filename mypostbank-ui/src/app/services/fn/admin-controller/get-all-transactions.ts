/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseTransactionDto } from '../../models/page-response-transaction-dto';

export interface GetAllTransactions$Params {
  page?: number;
  size?: number;
}

export function getAllTransactions(http: HttpClient, rootUrl: string, params?: GetAllTransactions$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTransactionDto>> {
  const rb = new RequestBuilder(rootUrl, getAllTransactions.PATH, 'get');
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

getAllTransactions.PATH = '/admin/transactions';
