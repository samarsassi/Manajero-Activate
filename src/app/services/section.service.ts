import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Section } from '../@core/data/Section';


@Injectable({
    providedIn: 'root'
})
export class SectionService {
    private apiUrl = 'http://localhost:9090/api/sections';
    
    private sectionUpdatedSource = new Subject<void>();

  sectionUpdated$ = this.sectionUpdatedSource.asObservable();

  notifySectionUpdated(): void {
    this.sectionUpdatedSource.next();
  }

    constructor(private http: HttpClient) { }

    getSections(): Observable<Section[]> {
        return this.http.get<Section[]>(this.apiUrl + '/retrieve-all');
    }

    getSectionById(id: string): Observable<Section> {
        return this.http.get<Section>(`${this.apiUrl}/retrieve/${id}`);
    }

    createSection(section: Section): Observable<Section> {
        return this.http.post<Section>(this.apiUrl + '/add', section);
    }

    updateSection(section: Section): Observable<Section> {
        return this.http.put<Section>(this.apiUrl + '/update', section);
    }

    deleteSection(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}