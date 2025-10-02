import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http
      .get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`)
      .pipe(map((response) => response.result));
  }

  createCourse(course: Course): Observable<Course> {
    return this.http
      .post<ApiResponse<Course>>(`${this.apiUrl}/courses/add`, course)
      .pipe(map((response) => response.result));
  }

  getCourse(id: string): Observable<Course> {
    return this.http
      .get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`)
      .pipe(map((response) => response.result));
  }

  editCourse(id: string, course: Course): Observable<Course> {
    return this.http
      .put<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`, course)
      .pipe(map((response) => response.result));
  }

  deleteCourse(id: string): Observable<boolean> {
    return this.http
      .delete<ApiResponse<any>>(`${this.apiUrl}/courses/${id}`)
      .pipe(map((response) => response.successful));
  }

  filterCourses(value: string): Observable<Course[]> {
    let params = new HttpParams();
    if (value) {
      params = params.set("title", value);
    }
    return this.http
      .get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`, { params })
      .pipe(map((response) => response.result));
  }

  getAllAuthors(): Observable<any> {
    return this.http
      .get<ApiResponse<any>>(`${this.apiUrl}/authors/all`)
      .pipe(map((response) => response.result));
  }

  createAuthor(name: string): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/authors/add`, { name })
      .pipe(map((response) => response.result));
  }

  getAuthorById(id: string): Observable<any> {
    return this.http
      .get<ApiResponse<any>>(`${this.apiUrl}/authors/${id}`)
      .pipe(map((response) => response.result));
  }
}
