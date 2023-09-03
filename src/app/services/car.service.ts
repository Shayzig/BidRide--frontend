import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs'
import { Bid, Car, FilterBy } from '../models/car.model'
import { storageService } from './async-storage.service'
import { HttpErrorResponse } from '@angular/common/http'
const ENTITY = 'cars'

@Injectable({
    providedIn: 'root'
})

export class CarService {

    private _cars$ = new BehaviorSubject<Car[]>([]) //store
    public cars$ = this._cars$.asObservable() // getter

    private _filterBy$ = new BehaviorSubject<FilterBy>({ model: '', mark: '', year: '/' }) //store
    public filterBy$ = this._filterBy$.asObservable() // getter

    constructor() {
        const cars = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!cars || cars.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createCars()))
        }
    }

    public loadCars() {
        return from(storageService.query(ENTITY))
            .pipe(
                tap(cars => {
                    const filterBy = this._filterBy$.value
                    cars = cars.filter(car =>
                        car.model.toLowerCase().includes(filterBy.model.toLowerCase()) &&
                        car.mark.toLowerCase().includes(filterBy.mark.toLowerCase()) &&
                        (filterBy.year === '/' || car.year === filterBy.year) // Include this condition
                    )
                    this._cars$.next(cars)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public setFilterBy(filterBy: FilterBy) {
        this._filterBy$.next(filterBy)
        this.loadCars().subscribe()
    }

    public getCarById(id: string): Observable<Car> {
        return from(storageService.get(ENTITY, id))
            .pipe(catchError(err => throwError(() => `Car id ${id} not found!`)))
    }

    public deleteCar(id: string) {
        return from(storageService.remove(ENTITY, id))
            .pipe(
                tap(() => {
                    let cars = this._cars$.value
                    cars = cars.filter(car => car._id !== id)
                    this._cars$.next(cars)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public saveCar(car: any) {
        return car._id ? this._updateCar(car) : this._addCar(car)
    }

    public getEmptyCar() {
        return {
            model: '',
            mark: '',
            year: '',
            doors: '',
            ac: '',
            transmission: '',
            fuel: '',
            imgUrl: `.../../assets/rental/default.png`,
            price: 0,
            rentStart: Date.now(),
            rentEnd: Date.now()
        }
    }

    private _updateCar(car: Car) {
        return from(storageService.put(ENTITY, car))
            .pipe(
                tap(updatedCar => {
                    const cars = this._cars$.value
                    this._cars$.next(cars.map(car => car._id === updatedCar._id ? updatedCar : car))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _addCar(car: Car) {
        return from(storageService.post(ENTITY, car))
            .pipe(
                tap(newCar => {
                    const cars = this._cars$.value
                    this._cars$.next([...cars, newCar])
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _createCars() {
        const cars: Car[] = [

            {
                _id: '2',
                model: 'VW',
                mark: 'Golf 6',
                year: '2019',
                doors: '5',
                ac: 'yes',
                transmission: 'Manual',
                imgUrl: '.../../assets/rental/2.jpeg',
                price: 49,
                rentStart: new Date('2023-11-12').getTime(),
                rentEnd: new Date('2023-12-19').getTime(),
                bids: [{toCar: "Golf 6", byUser: "Prince", time: 1693669959363, bidAmount: 33, date: 1693769957432}]
            },
            {
                _id: '1',
                model: 'Audi',
                mark: 'A1 S-Line',
                year: '2023',
                doors: '4',
                ac: 'yes',
                transmission: 'Automatic',
                imgUrl: `.../../assets/rental/1.jpeg`,
                price: 45,
                rentStart: new Date('2023-10-7').getTime(),
                rentEnd: new Date('2023-10-19').getTime(),
                bids: [{toCar: "A1 S-Line", byUser: "Willian", time: 1693669957363, bidAmount: 13, date: 1693769953252}]
            },
            {
                _id: '3',
                model: 'Toyota',
                mark: 'Camry',
                year: '2021',
                doors: '4',
                ac: 'yes',
                transmission: 'Automatic',
                imgUrl: '.../../assets/rental/3.jpeg',
                price: 35,
                rentStart: new Date('2023-11-24').getTime(),
                rentEnd: new Date('2023-12-1').getTime(),
                bids: []
            },
            {
                _id: '4',
                model: 'BMW',
                mark: 'Modernline',
                year: '2023',
                doors: '4',
                ac: 'yes',
                transmission: 'Automatic',
                imgUrl: '.../../assets/rental/4.jpeg',
                price: 23,
                rentStart: new Date('2023-11-30').getTime(),
                rentEnd: new Date('2024-01-9').getTime(),
                bids: [{toCar: "Moderline", byUser: "Josh", time: 1693669957163, bidAmount: 47, date: 1693769963252}]
            },
            {
                _id: '5',
                model: 'Mercedes',
                mark: 'Benz GLK',
                year: '2018',
                doors: '5',
                ac: 'yes',
                transmission: 'Automatic',
                imgUrl: '.../../assets/rental/5.jpeg',
                price: 33,
                rentStart: new Date('2023-09-15').getTime(),
                rentEnd: new Date('2023-10-5').getTime(),
                bids: []
            },
            {
                _id: '6',
                model: 'VW',
                mark: 'Passat CC',
                year: '2020',
                doors: '4',
                ac: 'yes',
                transmission: 'Automatic',
                imgUrl: '.../../assets/rental/6.jpeg',
                price: 53,
                rentStart: new Date('2023-11-12').getTime(),
                rentEnd: new Date('2024-01-22').getTime(),
                bids: []
            }
        ]
        return cars
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }
}
