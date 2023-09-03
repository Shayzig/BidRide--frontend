import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalFleetComponent } from './rental-fleet.component';

describe('RentalFleetComponent', () => {
  let component: RentalFleetComponent;
  let fixture: ComponentFixture<RentalFleetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalFleetComponent]
    });
    fixture = TestBed.createComponent(RentalFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
