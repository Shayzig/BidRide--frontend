import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private _isLoading$ = new BehaviorSubject<boolean>(false) //store
  public isLoading$ = this._isLoading$.asObservable() // getter

  setIsLoading(isLoading: boolean) {
    this._isLoading$.next(isLoading)
  }
}
