import { TestBed } from '@angular/core/testing';

import { ProfileBarService } from './profile-bar.service';

describe('ProfileBarService', () => {
  let service: ProfileBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
