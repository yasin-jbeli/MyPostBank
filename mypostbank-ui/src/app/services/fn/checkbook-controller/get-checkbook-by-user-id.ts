/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CheckbookDto } from '../../models/checkbook-dto';

export interface GetCheckbookByUserId$Params {
  checkbookId: number;
}

export function getCheckbookByUserId(http: HttpClient, rootUrl: string, params: GetCheckbookByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckbookDto>> {
  const rb = new RequestBuilder(rootUrl, getCheckbookByUserId.PATH, 'get');
  if (params) {
    rb.path('checkbookId', params.checkbookId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CheckbookDto>;
    })
  );
}

getCheckbookByUserId.PATH = '/user/checkbooks/{checkbookId}';
