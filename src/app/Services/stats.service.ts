import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/api/projects`).pipe(
      map(res => res.data)
    );
  }

  getAllFreelancers(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/api/freelancers`).pipe(
      map(res => res.data)
    );
  }

  getProjectCount(): Observable<number> {
    return this.getAllProjects().pipe(
      map(projects => Array.isArray(projects) ? projects.length : 0)
    );
  }

  getFreelancerCount(): Observable<number> {
    return this.getAllFreelancers().pipe(
      map(freelancers => Array.isArray(freelancers) ? freelancers.length : 0)
    );
  }
}