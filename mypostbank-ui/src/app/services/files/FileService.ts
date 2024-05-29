import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = '/api/files'; // Adjust this URL according to your backend API

  constructor(private http: HttpClient) { }

  downloadFile(userId: number, documentType: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/${documentType}/download-all`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
