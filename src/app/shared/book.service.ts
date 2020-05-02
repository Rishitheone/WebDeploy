import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootObject, Datum } from '../pages/home/home.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _baseUrl = 'https://samydigital.com/api/admin'

  constructor(private _http: HttpClient, private fb: FormBuilder, ) { }
  formData: Datum[] = [];

  setData(value) {
    this.formData = value;
  }

  getData() {
    return this.formData;
  }

  getDropPrimary(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-all-categories?type=primary');
  }
  getDropSecondary(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-all-categories?type=secondary');
  }
  getDropHigher(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-all-categories?type=higher');
  }
  getAllBook(): Observable<RootObject> {
    return this._http.get<RootObject>(this._baseUrl + '/get-all-books')
  }
  getBookById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/book-details/?book_id=' + id).pipe(
      map(response => {
        response = response.data;
        return response;
      }))
  }
  getTopicById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-topics?book_id=' + id)
  }
  getsubWebById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-topics?book_id=' + id)
  }
  getsubsubWebById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-topics?book_id=' + id)
  }
  getSubpieById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-piecharts?sub_topic_id=' + id)
  }
  getSubTimelineById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-timeline-entries?sub_topic_id=' + id)
  }
  getSubSubSubTimelineById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-timeline-entries?sub_topic_id=' + id)
  }
  getSubSubpieById(id: number): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-piecharts?sub_sub_topic_id=' + id)
  }

  createBook(formData): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-book', formData, {
    })
  }
  private _deleteBook = "http://35.173.187.82/aplis/public/api/admin"
  updateBook(formData): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/update-book', formData, {
    })
  }

  deleteBook(id): Observable<number[]> {
    return this._http.post<number[]>(this._baseUrl + '/delete-book?book_id=' + id, id)
  }
  onDeleteTopic(id): Observable<number[]> {
    return this._http.post<number[]>(this._baseUrl + '/delete-topic?topic_id=' + id,id)
  }
}
