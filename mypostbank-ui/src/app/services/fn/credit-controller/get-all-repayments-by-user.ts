/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RepaymentDetailDto } from '../../models/repayment-detail-dto';

export interface GetAllRepaymentsByUser$Params {
  creditId: number;
}

export function getAllRepaymentsByUser(http: HttpClient, rootUrl: string, params: GetAllRepaymentsByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RepaymentDetailDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllRepaymentsByUser.PATH, 'get');
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

getAllRepaymentsByUser.PATH = '/user/loans/{creditId}/all-payments';
