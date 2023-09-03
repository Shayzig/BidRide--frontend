import { Component } from '@angular/core'
import { Car } from '../models/car.model'

@Component({
  selector: 'rental-fleet',
  templateUrl: './rental-fleet.component.html',
  styleUrls: ['./rental-fleet.component.scss']
})
export class RentalFleetComponent {
  cars: Car[] = [
    {
      _id: '1',
      model: 'Audi',
      mark: 'A1 S-Line',
      year: '2022',
      doors: '4/5',
      ac: 'yes',
      transmission: 'Automatic',
      fuel: 'Petrol',
      imgUrl: `.../../assets/rental/1.jpeg`,
      price: 45,
      rentStart: Date.now(),
      rentEnd: Date.now(),
      bids:[]
    },
    {
      _id: '2',
      model: 'VW',
      mark: 'Golf 6',
      year: '2019',
      doors: '5',
      ac: 'yes',
      transmission: 'Manual',
      fuel: 'Diesel',
      imgUrl: '.../../assets/rental/2.jpeg',
      price: 49,
      rentStart: Date.now(),
      rentEnd: Date.now(),
      bids:[]
    },
    {
      _id: '3',
      model: 'Toyota',
      mark: 'Camry',
      year: '2021',
      doors: '4',
      ac: 'yes',
      transmission: 'Automatic',
      fuel: 'Hybr_id',
      imgUrl: '.../../assets/rental/3.jpeg',
      price: 35,
      rentStart: Date.now(),
      rentEnd: Date.now(),
      bids:[]
    },
    {
      _id: '4',
      model: 'BMW',
      mark: 'Modernline',
      year: '2023',
      doors: '4',
      ac: 'yes',
      transmission: 'Automatic',
      fuel: 'Electric',
      imgUrl: '.../../assets/rental/4.jpeg',
      price: 23,
      rentStart: Date.now(),
      rentEnd: Date.now(),
      bids:[]
    },
    {
      _id: '5',
      model: 'Mercedes',
      mark: 'Benz GLK',
      year: '2018',
      doors: '5',
      ac: 'yes',
      transmission: 'Automatic',
      fuel: 'Petrol',
      imgUrl: '.../../assets/rental/5.jpeg',
      price: 33,
      rentStart: Date.now(),
      rentEnd: Date.now(),
      bids:[]
    },
    {
      _id: '6',
      model: 'VW',
      mark: 'Passat CC',
      year: '2020',
      doors: '4',
      ac: 'yes',
      transmission: 'Automatic',
      fuel: 'Diesel',
      imgUrl: '.../../assets/rental/6.jpeg',
      price: 53,
      rentStart: Date.now(),
      rentEnd: Date.now(),
      bids:[]
    }
  ];

  detailsTitle: Array<string> = ['Model', 'Mark', 'Year', 'Doors', 'AC', 'Transmission', 'Fuel'];

  selectedCar: Car = this.cars[0];

  onSelectCar(car: Car) {
    this.selectedCar = car;
  }
}