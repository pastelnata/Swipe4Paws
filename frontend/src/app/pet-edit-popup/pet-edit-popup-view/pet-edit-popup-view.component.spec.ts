import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetEditPopupViewComponent } from './pet-edit-popup-view.component';

describe('PetEditPopupViewComponent', () => {
  let component: PetEditPopupViewComponent;
  let fixture: ComponentFixture<PetEditPopupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetEditPopupViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetEditPopupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
