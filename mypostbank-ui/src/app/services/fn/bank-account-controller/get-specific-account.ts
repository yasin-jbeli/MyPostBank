/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BankAccountDto } from '../../models/bank-account-dto';

export interface GetSpecificAccount$Params {
  accountId: number;
}

export function getSpecificAccount(http: HttpClient, rootUrl: string, params: GetSpecificAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<BankAccountDto>> {
  const rb = new RequestBuilder(rootUrl, getSpecificAccount.PATH, 'get');
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

getSpecificAccount.PATH = '/user/accounts/{accountId}';
