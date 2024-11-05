import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersComponent } from './shelters.component';

describe('SheltersComponent', () => {
  let component: SheltersComponent;
  let fixture: ComponentFixture<SheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
