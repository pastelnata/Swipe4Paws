import { TestBed } from '@angular/core/testing';

import { SheltersService } from './shelters.service';

describe('SheltersService', () => {
  let service: SheltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
