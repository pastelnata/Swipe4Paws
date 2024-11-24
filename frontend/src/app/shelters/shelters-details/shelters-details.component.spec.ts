import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersDetailsComponent } from './shelters-details.component';

describe('SheltersDetailsComponent', () => {
  let component: SheltersDetailsComponent;
  let fixture: ComponentFixture<SheltersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheltersDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheltersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
