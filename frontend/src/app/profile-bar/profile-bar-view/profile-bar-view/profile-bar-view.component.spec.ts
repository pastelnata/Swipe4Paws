import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBarViewComponent } from './profile-bar-view.component';

describe('ProfileBarViewComponent', () => {
  let component: ProfileBarViewComponent;
  let fixture: ComponentFixture<ProfileBarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBarViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
