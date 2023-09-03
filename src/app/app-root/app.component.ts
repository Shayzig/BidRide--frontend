import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
// import { CarService } from '../services/car.service.back';
import { take } from 'rxjs';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.loadCars()
            .pipe(take(1))
            .subscribe({
                // next: data => console.log('data', data),
                error: err => console.log('err:', err),
            })
    }

    ngOnDestroy() {
        console.log('destroyed')
    }
}
