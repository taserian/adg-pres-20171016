import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UnemploymentService {
  private UnemploymentDataURL = 'http://localhost:8010/unemployment.tsv';
  mapData: any;

  constructor(private http: Http) {
  }

  public getUnemploymentData(): Observable<any> {
    return this.http.get(this.UnemploymentDataURL)
    .map(res => {
      return res.json(); });
  }

}
