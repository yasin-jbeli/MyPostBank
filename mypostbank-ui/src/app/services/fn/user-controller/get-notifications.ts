/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Notification } from '../../models/notification';

export interface GetNotifications$Params {
}

export function getNotifications(http: HttpClient, rootUrl: string, params?: GetNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Notification>>> {
  const rb = new RequestBuilder(rootUrl, getNotifications.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Notification>>;
    })
  );
}

getNotifications.PATH = '/user/notifications';
