/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RepaymentDetailDto } from '../../models/repayment-detail-dto';

export interface GetDuePayments$Params {
  creditId: number;
}

export function getDuePayments(http: HttpClient, rootUrl: string, params: GetDuePayments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RepaymentDetailDto>>> {
  const rb = new RequestBuilder(rootUrl, getDuePayments.PATH, 'get');
  if (params) {
    rb.path('creditId', params.creditId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<RepaymentDetailDto>>;
    })
  );
}

getDuePayments.PATH = '/user/loans/{creditId}/due-payments';
