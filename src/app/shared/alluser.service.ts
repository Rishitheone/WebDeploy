import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlluserService {
  private _baseUrl = 'https://samystudios.com/api/admin'

  constructor(private _http: HttpClient) { }

  getAlluser(counter){
      return this._http.get<any>(this._baseUrl+'/get-all-users?page=' + counter).pipe(
        catchError(this.handleError)
      );
  }
  getAllTeachers(counter){
      return this._http.get<any>(this._baseUrl+'/get-all-teachers?page='+ counter).pipe(
        catchError(this.handleError)
      );
  }
  getAllStudents(counter){
      return this._http.get<any>(this._baseUrl+'/get-all-students?page='+ counter ).pipe(
        catchError(this.handleError)
      );
  }

  userStatus(form){
    return this._http.post<any>(this._baseUrl+'/change-user-status',form)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    return throwError('Something bad happened. Please try again later.');
  }
}