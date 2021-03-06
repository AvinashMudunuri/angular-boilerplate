import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderState } from './loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<LoaderState>({ show: false });

  constructor() {}

  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
  getState(): Observable<any> {
    return this.loaderSubject.asObservable();
  }
}
