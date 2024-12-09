import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites-view.component';

describe('FavouritesViewComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
