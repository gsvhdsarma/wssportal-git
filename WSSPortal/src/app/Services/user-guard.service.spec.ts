import { TestBed, inject } from '@angular/core/testing';

import { UserGuard } from './user-guard.service';

describe('UserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuard]
    });
  });

  it('should be created', inject([UserGuard], (service: UserGuard) => {
    expect(service).toBeTruthy();
  }));
});
