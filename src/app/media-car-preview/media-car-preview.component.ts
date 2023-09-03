import { Component, Input } from '@angular/core';
import { Car } from '../models/car.model';

@Component({
  selector: 'media-car-preview',
  templateUrl: './media-car-preview.component.html',
  styleUrls: ['./media-car-preview.component.scss']
})
export class MediaCarPreviewComponent {
  @Input() car!: Car
}
