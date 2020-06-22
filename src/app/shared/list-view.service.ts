import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListViewService {

  private _baseUrl = 'https://samystudios.com/api/admin'

  constructor(private _http: HttpClient,) { }

  subsubId(id: number){
    return this._http.get<any>(this._baseUrl + '/get-websites?sub_sub_topic_id='+id)
  }


}
