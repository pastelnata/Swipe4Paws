import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetAddComponent } from './pet-add.component';

describe('PetAddComponent', () => {
  let component: PetAddComponent;
  let fixture: ComponentFixture<PetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
