/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreditDto } from '../../models/credit-dto';

export interface GetLoanById$Params {
  creditId: number;
}

export function getLoanById(http: HttpClient, rootUrl: string, params: GetLoanById$Params, context?: HttpContext): Observable<StrictHttpResponse<CreditDto>> {
  const rb = new RequestBuilder(rootUrl, getLoanById.PATH, 'get');
  if (params) {
    rb.path('creditId', params.creditId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CreditDto>;
    })
  );
}

getLoanById.PATH = '/user/loans/{creditId}';
