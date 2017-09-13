import { TestBed, inject } from '@angular/core/testing';

import { WSSPortalServiceList } from './wssportservicelist.service';

describe('WssportservicelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WSSPortalServiceList]
    });
  });

  it('should be created', inject([WSSPortalServiceList], (service: WSSPortalServiceList) => {
    expect(service).toBeTruthy();
  }));
});
