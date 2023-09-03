import { Injectable } from '@angular/core'
import { httpService } from './http.service'
import { BehaviorSubject, catchError, from, retry, tap, throwError } from 'rxjs'
import { Car, FilterBy } from '../models/car.model'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class CarService {

    private _cars$ = new BehaviorSubject<Car[]>([]) //store
    public cars$ = this._cars$.asObservable() // getter

    private _filterBy$ = new BehaviorSubject<FilterBy>({ model: '', mark: '', year: '/' }) //store
    public filterBy$ = this._filterBy$.asObservable() // getter

    public loadCars(filterBy: any = { model: '', mark: '', year: '' }) {
        return from(httpService.get('car', filterBy))
            .pipe(
                tap(cars => {
                    // console.log('Cars received from the HTTP request:', cars)
                    const filterBy = this._filterBy$.value
                    cars = cars.filter((car: { model: string; mark: string; year: string }) =>
                        car.model.toLowerCase().includes(filterBy.model.toLowerCase()) &&
                        car.mark.toLowerCase().includes(filterBy.mark.toLowerCase()) &&
                        (filterBy.year === '/' || car.year === filterBy.year) 
                    )
                    this._cars$.next(cars)
                    // console.log('Cars after filtering:', cars)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public setFilterBy(filterBy: FilterBy) {
        this._filterBy$.next(filterBy)
        this.loadCars().subscribe()
    }

    public getCarById(carId: string) {
        return from(httpService.get(`car/${carId}`))
            .pipe(catchError(err => throwError(() => `Car id ${carId} not found!`)))
    }

    public deleteCar(carId: string) {
        return from(httpService.delete(`car/${carId}`))
            .pipe(
                tap(() => {
                    let cars = this._cars$.value
                    cars = cars.filter(car => car._id !== carId)
                    this._cars$.next(cars)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public saveCar(car: any) {
        var savedCar
        if (car._id) {
            savedCar = this._updateCar(car)
        } else {
            savedCar = this._addCar(car)
        }
        return savedCar
    }

    private _updateCar(car: any) {
        return from(httpService.put(`car/${car._id}`, car))
            .pipe(
                tap(updatedCar => {
                    const cars = this._cars$.value
                    this._cars$.next(cars.map(car => car._id === updatedCar._id ? updatedCar : car))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _addCar(car: any) {
        return from(httpService.post('car', car))
            .pipe(
                tap(newCar => {
                    const cars = this._cars$.value
                    this._cars$.next([...cars, newCar])
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }

}