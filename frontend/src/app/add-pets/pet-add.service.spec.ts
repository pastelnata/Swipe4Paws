import { TestBed } from '@angular/core/testing';

import { PetAddService } from './pet-add.service';

describe('PetAddService', () => {
  let service: PetAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
