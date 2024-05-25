/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RequestLoan$Params {
  amount: number;
  rate: number;
  duration: number;
  accountId: number;
      body?: {
'form': Blob;
'statements': Blob;
'proof': Blob;
}
}

export function requestLoan(http: HttpClient, rootUrl: string, params: RequestLoan$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, requestLoan.PATH, 'post');
  if (params) {
    rb.query('amount', params.amount, {});
    rb.query('rate', params.rate, {});
    rb.query('duration', params.duration, {});
    rb.query('accountId', params.accountId, {});
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

requestLoan.PATH = '/user/loans/request-loan';
