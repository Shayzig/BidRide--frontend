import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars: Car[] | null = null
  @Output() remove = new EventEmitter<string>()
  @Output() select = new EventEmitter<Car>()
}
