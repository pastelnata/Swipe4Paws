import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsListingComponent } from './pets-listing.component';

describe('PetsListingComponent', () => {
  let component: PetsListingComponent;
  let fixture: ComponentFixture<PetsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
