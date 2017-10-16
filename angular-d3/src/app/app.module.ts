import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { MapDataService } from './services/mapdata.service';
import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { TestD3Component } from './components/testd3/testd3.component';

@NgModule({
  declarations: [
    AppComponent,
    TestD3Component
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    D3Service,
    MapDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
