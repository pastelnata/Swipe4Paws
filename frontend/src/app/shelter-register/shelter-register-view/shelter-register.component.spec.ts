import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterRegisterComponent } from './shelter-register.component';

describe('ShelterRegisterComponent', () => {
  let component: ShelterRegisterComponent;
  let fixture: ComponentFixture<ShelterRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShelterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
