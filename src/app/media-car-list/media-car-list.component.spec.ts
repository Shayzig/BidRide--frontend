import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCarListComponent } from './media-car-list.component';

describe('MediaCarListComponent', () => {
  let component: MediaCarListComponent;
  let fixture: ComponentFixture<MediaCarListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaCarListComponent]
    });
    fixture = TestBed.createComponent(MediaCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
