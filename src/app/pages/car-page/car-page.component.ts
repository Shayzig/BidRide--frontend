import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
// import { CarService } from 'src/app/services/car.service.back';

@Component({
  selector: 'car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {

  constructor(private carService: CarService) { }
  subscription!: Subscription

  cars$!: Observable<Car[]>
  selectedCar: Car | null = null

  ngOnInit(): void {
    this.cars$ = this.carService.cars$
  }

  onRemoveCar(carId: string) {
    this.carService.deleteCar(carId).subscribe({
      error: err => console.log('err:', err)
    })
  }

  onSelectCar(car: Car) {
    this.selectedCar = car
  }

}
