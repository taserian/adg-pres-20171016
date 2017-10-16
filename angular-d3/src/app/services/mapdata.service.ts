import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MapDataService {
  private mapDataURL = 'http://localhost:8010/counties_topo.json';
  mapData: any;

  constructor(private http: Http) {
  }

  public getMapData(): Observable<any> {
    return this.http.get(this.mapDataURL)
    .map(res => {
      return res.json(); });
  }

}
