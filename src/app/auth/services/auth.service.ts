import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean>;
  public isAuthorized$: Observable<boolean>;
  private readonly baseUrl = 'http://localhost:4000/api/auth';

  constructor(
    private http: HttpClient,
    private session: SessionStorageService,
    private router: Router
  ) {
    this.isAuthorized$$ = new BehaviorSubject<boolean>(!!this.session.getToken());
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }

  login(user: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, user).pipe(
      tap(res => {
        if (res && res.token) {
          this.session.setToken(res.token);
          this.isAuthorized$$.next(true);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        this.session.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(['/login']);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return '/login';
  }
}
