import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CarService } from '../services/car.service';
// import { CarService } from '../services/car.service.back';
import { Car } from '../models/car.model';
import { LoaderService } from '../services/loader.service';

export const carResolver: ResolveFn<Car> = (route, state) => {
  inject(LoaderService).setIsLoading(true)
  const id = route.params['id']
  return inject(CarService).getCarById(id)
};
