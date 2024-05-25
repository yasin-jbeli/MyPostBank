/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TransactionDto } from '../../models/transaction-dto';

export interface GetTransaction$Params {

/**
 * Transaction ID
 */
  transactionId: number;
}

export function getTransaction(http: HttpClient, rootUrl: string, params: GetTransaction$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionDto>> {
  const rb = new RequestBuilder(rootUrl, getTransaction.PATH, 'get');
  if (params) {
    rb.path('transactionId', params.transactionId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TransactionDto>;
    })
  );
}

getTransaction.PATH = '/admin/transactions/{transactionId}';
