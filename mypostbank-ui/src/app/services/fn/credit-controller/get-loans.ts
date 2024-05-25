/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreditDto } from '../../models/credit-dto';

export interface GetLoans$Params {
}

export function getLoans(http: HttpClient, rootUrl: string, params?: GetLoans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CreditDto>>> {
  const rb = new RequestBuilder(rootUrl, getLoans.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CreditDto>>;
    })
  );
}

getLoans.PATH = '/user/loans/';
