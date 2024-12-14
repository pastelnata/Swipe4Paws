import { TestBed } from '@angular/core/testing';

import { ShelterAppService } from './shelter-app.service';

describe('ShelterAppService', () => {
  let service: ShelterAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelterAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
