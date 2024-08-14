import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Realize } from '../@core/data/Realize';

@Injectable({
  providedIn: 'root'
})
export class RealizeService {
  private apiUrl = 'http://localhost:9090/api/realize';

  constructor(private http: HttpClient) {}

  getAllRealizes(): Observable<Realize[]> {
    return this.http.get<Realize[]>(`${this.apiUrl}/retrieve-all`);
  }

  getRealize(id: string): Observable<Realize> {
    return this.http.get<Realize>(`${this.apiUrl}/retrieve/${id}`);
  }

  addRealize(Realize: Realize): Observable<Realize> {
    return this.http.post<Realize>(`${this.apiUrl}/add`, Realize);
  }

  updateRealize(Realize: Realize): Observable<Realize> {
    return this.http.put<Realize>(`${this.apiUrl}/update`, Realize);
  }

  deleteRealize(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}