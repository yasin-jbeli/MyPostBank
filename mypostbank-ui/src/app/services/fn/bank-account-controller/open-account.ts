/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface OpenAccount$Params {

/**
 * Type of account
 */
  accountType: 'CHECKING' | 'SAVINGS';
      body?: {
'file': Blob;
}
}

export function openAccount(http: HttpClient, rootUrl: string, params: OpenAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, openAccount.PATH, 'post');
  if (params) {
    rb.query('accountType', params.accountType, {});
    rb.body(params.body, 'multipart/form-data');
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

openAccount.PATH = '/user/accounts/open';
