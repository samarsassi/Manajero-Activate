import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { DiscoverPhase } from '../@core/data/DiscoverPhase';
import { Projects } from '../@core/data/Projects';
import { ProjectPreparation } from '../@core/data/project-preparation.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
    private apiUrl = 'http://localhost:9090/api/Projects';
    
    private projectUpdatedSource = new Subject<void>();

  projectUpdated$ = this.projectUpdatedSource.asObservable();

  notifyProjectUpdated(): void {
    this.projectUpdatedSource.next();
  }

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Projects[]> {
        return this.http.get<Projects[]>(this.apiUrl + '/retrieve-all');
    }

    getProjectById(id: string): Observable<Projects> {
        return this.http.get<Projects>(`${this.apiUrl}/retrieve/${id}`);
    }

    createProject(project: Projects): Observable<Projects> {
        return this.http.post<Projects>(this.apiUrl + '/addProject', project);
    }

    updateProject(project: Projects): Observable<Projects> {
        return this.http.put<Projects>(this.apiUrl + '/updateProject', project);
    }

    deleteProject(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
    
    addPreperation(preparation: ProjectPreparation, id:string): Observable<Projects> {
      return this.http.put<Projects>(`${this.apiUrl}/addProjectPrep/${id}`, preparation);
  }
}
