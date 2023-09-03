import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCarPreviewComponent } from './media-car-preview.component';

describe('MediaCarPreviewComponent', () => {
  let component: MediaCarPreviewComponent;
  let fixture: ComponentFixture<MediaCarPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaCarPreviewComponent]
    });
    fixture = TestBed.createComponent(MediaCarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
