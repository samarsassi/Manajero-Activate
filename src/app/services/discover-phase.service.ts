import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DiscoverPhase } from '../@core/data/DiscoverPhase';

@Injectable({
  providedIn: 'root'
})
export class DiscoverPhaseService {
  private baseUrl = `http://localhost:9090/api/DiscoverPhase`;  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getAllPhases(): Observable<DiscoverPhase[]> {
    return this.http.get<DiscoverPhase[]>(`${this.baseUrl}/getAllPhases`);
  }

  addDiscover(discoverPhase: DiscoverPhase): Observable<DiscoverPhase> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<DiscoverPhase>(`${this.baseUrl}/addDiscover`, discoverPhase, { headers });
  }
}
