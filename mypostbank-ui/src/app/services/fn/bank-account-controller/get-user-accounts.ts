/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BankAccountDto } from '../../models/bank-account-dto';

export interface GetUserAccounts$Params {
}

export function getUserAccounts(http: HttpClient, rootUrl: string, params?: GetUserAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BankAccountDto>>> {
  const rb = new RequestBuilder(rootUrl, getUserAccounts.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BankAccountDto>>;
    })
  );
}

getUserAccounts.PATH = '/user/accounts/';
