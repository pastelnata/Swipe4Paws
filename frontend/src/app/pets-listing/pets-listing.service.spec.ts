import { TestBed } from '@angular/core/testing';

import { PetsListingService } from './pets-listing.service';

describe('PetsListingService', () => {
  let service: PetsListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetsListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
