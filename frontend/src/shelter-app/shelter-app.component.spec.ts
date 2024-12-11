import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAppComponent } from './shelter-app.component';

describe('ShelterAppComponent', () => {
  let component: ShelterAppComponent;
  let fixture: ComponentFixture<ShelterAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
