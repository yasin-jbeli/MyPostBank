/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateCheckbookStatus$Params {

/**
 * checkbook id
 */
  checkId: number;

/**
 * status
 */
  checkbookStatus: 'ORDERED' | 'BEING_DELIVERED' | 'RECEIVED';
}

export function updateCheckbookStatus(http: HttpClient, rootUrl: string, params: UpdateCheckbookStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, updateCheckbookStatus.PATH, 'post');
  if (params) {
    rb.path('checkId', params.checkId, {});
    rb.path('checkbookStatus', params.checkbookStatus, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

updateCheckbookStatus.PATH = '/admin/checkbook/{checkId}/update/{checkbookStatus}';
