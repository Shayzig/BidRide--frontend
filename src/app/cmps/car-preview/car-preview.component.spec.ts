import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPreviewComponent } from './car-preview.component';

describe('CarPreviewComponent', () => {
  let component: CarPreviewComponent;
  let fixture: ComponentFixture<CarPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarPreviewComponent]
    });
    fixture = TestBed.createComponent(CarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
