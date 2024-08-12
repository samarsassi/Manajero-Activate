import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectPreparation } from '../@core/data/project-preparation.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectPreparationService {
  private apiUrl = 'http://localhost:9090/api/project-preparation';

  constructor(private http: HttpClient) {}

  getAllProjectPreparations(): Observable<ProjectPreparation[]> {
    return this.http.get<ProjectPreparation[]>(`${this.apiUrl}/retrieve-all`);
  }

  getProjectPreparation(id: string): Observable<ProjectPreparation> {
    return this.http.get<ProjectPreparation>(`${this.apiUrl}/retrieve/${id}`);
  }
    // Example service method
  getProjectPreparationsByProjectId(projectId: number): Observable<ProjectPreparation> {
    return this.http.get<ProjectPreparation>(`/api/projectPreparations?projectId=${projectId}`);
  }


  addProjectPreparation(projectPreparation: ProjectPreparation): Observable<ProjectPreparation> {
    return this.http.post<ProjectPreparation>(`${this.apiUrl}/add`, projectPreparation);
  }

  updateProjectPreparation(projectPreparation: ProjectPreparation): Observable<ProjectPreparation> {
    return this.http.put<ProjectPreparation>(`${this.apiUrl}/update`, projectPreparation);
  }

  deleteProjectPreparation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}