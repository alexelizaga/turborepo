import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncommonPageComponent } from './uncommon-page.component';

describe('UncommonPageComponent', () => {
  let component: UncommonPageComponent;
  let fixture: ComponentFixture<UncommonPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UncommonPageComponent]
    });
    fixture = TestBed.createComponent(UncommonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
