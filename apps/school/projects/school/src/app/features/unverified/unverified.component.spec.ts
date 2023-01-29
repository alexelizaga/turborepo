import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnverifiedComponent } from './unverified.component';

describe('UnverifiedComponent', () => {
  let component: UnverifiedComponent;
  let fixture: ComponentFixture<UnverifiedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnverifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
