/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardDto } from '../../models/card-dto';

export interface GetAllCards$Params {
}

export function getAllCards(http: HttpClient, rootUrl: string, params?: GetAllCards$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllCards.PATH, 'get');
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

getAllCards.PATH = '/admin/cards';
