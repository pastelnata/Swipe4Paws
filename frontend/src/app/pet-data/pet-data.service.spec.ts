import { TestBed } from '@angular/core/testing';

import { PetDataService } from './pet-data.service';

describe('PetDataService', () => {
  let service: PetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
