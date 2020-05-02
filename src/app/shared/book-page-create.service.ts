import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookPageCreateService {
  id:number;
  timeId:number;
  SubtimeId:number;
  private _baseUrl = 'https://samydigital.com/api/admin'
  constructor(private _http: HttpClient) { }

  createTopic(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-topic', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createSubTopic(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-sub-topic', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createTimeline(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-timeline', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createsubTimeline(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-timeline-entries', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createPieChart(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-piechart', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createSubWeb(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-website', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createSubSubTopic(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-sub-sub-topic', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  setData(id) {
    this.id = id
  }
  setTimeData(timeId){
     this.timeId = timeId;
  }
  setSubTimeData(SubtimeId){
     this.SubtimeId = SubtimeId;
  }
  getSubSub(){
    return this.SubtimeId;
  }
  getTimeId(){
    return this.timeId;
  }

  getData() {
    return this.id;
  }
}
