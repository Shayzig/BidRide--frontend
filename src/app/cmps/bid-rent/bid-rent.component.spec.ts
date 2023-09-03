import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidRentComponent } from './bid-rent.component';

describe('BidRentComponent', () => {
  let component: BidRentComponent;
  let fixture: ComponentFixture<BidRentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidRentComponent]
    });
    fixture = TestBed.createComponent(BidRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
