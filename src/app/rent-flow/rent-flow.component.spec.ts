import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentFlowComponent } from './rent-flow.component';

describe('RentFlowComponent', () => {
  let component: RentFlowComponent;
  let fixture: ComponentFixture<RentFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentFlowComponent]
    });
    fixture = TestBed.createComponent(RentFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
