/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BankAccountDto } from '../../models/bank-account-dto';

export interface GetAccountById$Params {

/**
 * Account ID
 */
  accountId: number;
}

export function getAccountById(http: HttpClient, rootUrl: string, params: GetAccountById$Params, context?: HttpContext): Observable<StrictHttpResponse<BankAccountDto>> {
  const rb = new RequestBuilder(rootUrl, getAccountById.PATH, 'get');
  if (params) {
    rb.path('accountId', params.accountId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BankAccountDto>;
    })
  );
}

getAccountById.PATH = '/admin/accounts/{accountId}';
