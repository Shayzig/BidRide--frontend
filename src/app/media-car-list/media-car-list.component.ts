import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../models/car.model';

@Component({
  selector: 'media-car-list',
  templateUrl: './media-car-list.component.html',
  styleUrls: ['./media-car-list.component.scss']
})
export class MediaCarListComponent {
  @Input() cars!: Car[]
  @Output() remove = new EventEmitter<number>()
  @Output() onSelect = new EventEmitter<Car>()

  onSelectCar(car: Car): void {
    this.onSelect.emit(car)
  }

  onRemove(watcherId: number) {
    this.remove.emit(watcherId)
  }

}
