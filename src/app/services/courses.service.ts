import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly baseUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courses`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/courses`, course);
  }

  editCourse(id: string, course: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<any[]> {
    const params = new HttpParams().set('text', value || '');
    return this.http.get<any[]>(`${this.baseUrl}/courses`, { params });
  }

  getAllAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/authors`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authors`, { name });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/authors/${id}`);
  }
}
