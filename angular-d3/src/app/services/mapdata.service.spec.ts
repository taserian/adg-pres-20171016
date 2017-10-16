import { TestBed, inject } from '@angular/core/testing';

import { MapdataService } from './mapdata.service';

describe('MapdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapdataService]
    });
  });

  it('should be created', inject([MapdataService], (service: MapdataService) => {
    expect(service).toBeTruthy();
  }));
});
