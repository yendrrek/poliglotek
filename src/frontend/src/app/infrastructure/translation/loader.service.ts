import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private spinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly spinner: Observable<boolean> = this.spinnerSubject.asObservable();

  constructor() {}

  showSpinner() {
    this.spinnerSubject.next(true);
  }

  hideSpinner() {
    this.spinnerSubject.next(false);
  }
}
