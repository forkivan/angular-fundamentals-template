import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses`, course);
  }

  getCourse(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${id}`);
  }

  editCourse(id: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<any[]> {
    const params = new HttpParams().set('text', value || '');
    return this.http.get<any[]>(`${this.apiUrl}/courses`, { params });
  }

  getAllAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/authors`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authors`, { name });
  }

  getAuthorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/authors/${id}`);
  }
}
