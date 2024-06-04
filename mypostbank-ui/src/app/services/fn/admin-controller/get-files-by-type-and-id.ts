/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FileEntity } from '../../models/file-entity';

export interface GetFilesByTypeAndId$Params {

/**
 * File type (CIN_FILE or CREDIT)
 */
  fileType: 'CREDIT' | 'CIN_FILE';

/**
 * ID
 */
  id: number;
}

export function getFilesByTypeAndId(http: HttpClient, rootUrl: string, params: GetFilesByTypeAndId$Params, context?: HttpContext): Observable<StrictHttpResponse<FileEntity>> {
  const rb = new RequestBuilder(rootUrl, getFilesByTypeAndId.PATH, 'get');
  if (params) {
    rb.path('fileType', params.fileType, {});
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FileEntity>;
    })
  );
}

getFilesByTypeAndId.PATH = '/admin/files/{fileType}/{id}';
