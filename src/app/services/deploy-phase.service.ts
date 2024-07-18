import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeployPhase } from '../@core/data/Deploy';

@Injectable({
  providedIn: 'root'
})
export class DeployPhaseService {
  private baseUrl = `http://localhost:9090/api/DeployPhase`;  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getAllPhases(): Observable<DeployPhase[]> {
    return this.http.get<DeployPhase[]>(`${this.baseUrl}/getAllPhases`);
  }

  addDeploy(deployPhase: DeployPhase): Observable<DeployPhase> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<DeployPhase>(`${this.baseUrl}/addDeploy`, deployPhase, { headers });
  }
}
