import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

export interface InstitutionInerFace {
  id: number;
  name: string;
  cirriculum: string;
  logo: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pin_code: string;
  phone: string;
  country: string;
  website: string;
  contact_person_name: string;
  email: string;
  level: string;
  created_at: string;
  updated_at: string;
  total_students: number;
  total_teachers: number;
}

export interface AllInstitution {
  status: number;
  data: InstitutionInerFace[];
}

@Injectable({
  providedIn: 'root'
})
export class InstituionService {

  about = []; 
  private _baseUrl = 'https://samystudios.com/api/admin'

  constructor(private _http: HttpClient, private fb: FormBuilder, ) { }

  saveSeries(form): Observable<any> {
    return this._http.post<any>(this._baseUrl+"/save-institution", form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  updateSeries(form): Observable<any> {
    return this._http.post<any[]>(this._baseUrl+'/update-institution', form, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json'
      // })
    })
  }
  getSeriesById(id:number):Observable<any>{
    return this._http.get<any>(this._baseUrl+'/institution-details?institution_id='+id)
 }


  getAllSeries(): Observable<any> {
    return this._http.get<any>(this._baseUrl+'/get-all-institutions');
  }

  deleteSeries(id): Observable<number[]> {
    return this._http.post<number[]>(this._baseUrl+'/delete-institution?institution_id='+ id, id)
  }

  setAbout(about) {
    this.about = about
  }

  getAbout() {
    return this.about;
  }

}
