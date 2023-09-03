import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CarService } from '../services/car.service';
// import { CarService } from '../services/car.service.back';
import { Car } from '../models/car.model';

export const carResolver: ResolveFn<Car> = (route, state) => {
  const id = route.params['id']
  return inject(CarService).getCarById(id)
};
