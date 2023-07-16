import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersPageComponent } from './numbers-page.component';

describe('NumbersPageComponent', () => {
  let component: NumbersPageComponent;
  let fixture: ComponentFixture<NumbersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumbersPageComponent]
    });
    fixture = TestBed.createComponent(NumbersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
