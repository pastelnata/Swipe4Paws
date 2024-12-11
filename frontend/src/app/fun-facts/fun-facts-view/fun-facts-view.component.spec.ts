import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunFactsViewComponent } from './fun-facts-view.component';

describe('FunFactsViewComponent', () => {
  let component: FunFactsViewComponent;
  let fixture: ComponentFixture<FunFactsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunFactsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunFactsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
