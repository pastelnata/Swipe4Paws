import { TestBed } from '@angular/core/testing';

import { PetsDetailsService } from './pets-details.service';

describe('PetsDetailsService', () => {
  let service: PetsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
