import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = new BehaviorSubject<string>('');
  error$: Observable<string> = this._error.asObservable();

  showError(message: string): void {
    this._error.next(message);
  }

  clearError(): void {
    this._error.next('');
  }
}
