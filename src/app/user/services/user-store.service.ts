import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): Observable<any> {
    return this.userService.getUser().pipe(
      tap(user => {
        const userName = user?.name ?? null;
        const adminFlag = !!(user?.isAdmin || (user?.email === 'admin@email.com'));
        this.name$$.next(userName);
        this.isAdmin$$.next(adminFlag);
      })
    );
  }

  setUserFromPayload(user: any) {
    const userName = user?.name ?? user?.email ?? null;
    const adminFlag = !!(user?.isAdmin || (user?.email === 'admin@email.com'));
    this.name$$.next(userName);
    this.isAdmin$$.next(adminFlag);
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
