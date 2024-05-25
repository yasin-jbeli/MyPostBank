/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardDto } from '../../models/card-dto';

export interface GetUserCards$Params {
}

export function getUserCards(http: HttpClient, rootUrl: string, params?: GetUserCards$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardDto>>> {
  const rb = new RequestBuilder(rootUrl, getUserCards.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardDto>>;
    })
  );
}

getUserCards.PATH = '/user/cards/';
