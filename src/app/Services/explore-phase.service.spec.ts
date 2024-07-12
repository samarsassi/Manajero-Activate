import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExplorePhase } from '../Model/ExplorePhase.Model';

@Injectable({
  providedIn: 'root'
})
export class ExplorePhaseService {
  private apiUrl = 'http://localhost:9090/api/explorePhases';

  constructor(private http: HttpClient) {}

  getAllExplorePhases(): Observable<ExplorePhase[]> {
    return this.http.get<ExplorePhase[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getExplorePhaseById(id: string): Observable<ExplorePhase> {
    return this.http.get<ExplorePhase>(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createExplorePhase(phase: ExplorePhase): Observable<ExplorePhase> {
    return this.http.post<ExplorePhase>(`${this.apiUrl}/addE`, phase).pipe(
      catchError(this.handleError)
    );
  }

  updateExplorePhase(phase: ExplorePhase): Observable<ExplorePhase> {
    return this.http.put<ExplorePhase>(`${this.apiUrl}/updatePhase`, phase).pipe(
      catchError(this.handleError)
    );
  }

  deleteExplorePhase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }
}
