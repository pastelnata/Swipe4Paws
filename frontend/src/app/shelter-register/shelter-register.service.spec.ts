import { TestBed } from '@angular/core/testing';

import { ShelterRegisterService } from './shelter-register.service';

describe('ShelterRegisterService', () => {
  let service: ShelterRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelterRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
