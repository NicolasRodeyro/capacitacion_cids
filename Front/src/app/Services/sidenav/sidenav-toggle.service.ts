import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavToggleService {
  private toggleSubject = new Subject<void>();
  toggle$ = this.toggleSubject.asObservable();

  toggleSidenav() {
    this.toggleSubject.next();
  }
}
