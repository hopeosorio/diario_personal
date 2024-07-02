import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiUrl = 'http://localhost:3000/api/entries';

  constructor(private http: HttpClient) { }

  getEntries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEntry(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEntry(entry: any): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }

  updateEntry(id: string, entry: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, entry);
  }

  deleteEntry(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
