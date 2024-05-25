/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CheckbookDto } from '../../models/checkbook-dto';

export interface GetCheckbookByUserId1$Params {
}

export function getCheckbookByUserId1(http: HttpClient, rootUrl: string, params?: GetCheckbookByUserId1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CheckbookDto>>> {
  const rb = new RequestBuilder(rootUrl, getCheckbookByUserId1.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CheckbookDto>>;
    })
  );
}

getCheckbookByUserId1.PATH = '/user/checkbooks/';
