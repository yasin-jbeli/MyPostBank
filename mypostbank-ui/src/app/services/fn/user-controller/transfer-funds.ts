/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface TransferFunds$Params {

/**
 * Source account id
 */
  sourceAccountId: number;

/**
 * Destination account id
 */
  destinationAccountId: number;

/**
 * Amount to transfer
 */
  amount: number;
}

export function transferFunds(http: HttpClient, rootUrl: string, params: TransferFunds$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, transferFunds.PATH, 'post');
  if (params) {
    rb.query('sourceAccountId', params.sourceAccountId, {});
    rb.query('destinationAccountId', params.destinationAccountId, {});
    rb.query('amount', params.amount, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

transferFunds.PATH = '/user/transfer';
