import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FilterBy } from 'src/app/models/filterby.model';
import { CarService } from 'src/app/services/car.service';
// import { CarService } from 'src/app/services/car.service.back';

@Component({
  selector: 'car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.scss']
})
export class CarFilterComponent implements OnInit, OnDestroy {
  constructor(private carService: CarService) { }

  filterBy!: FilterBy

  filterBySubject$ = new Subject()

  destroyBySubject$ = new Subject()


  ngOnInit(): void {
    this.carService.filterBy$
      .pipe(takeUntil(this.destroyBySubject$))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterBySubject$
      .pipe(debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroyBySubject$)
      )
      .subscribe(x => {
        this.carService.setFilterBy(this.filterBy)
      })
  }


  onSetFilterBy(value: string) {
    this.filterBySubject$.next(value)
  }


  ngOnDestroy(): void {
    this.destroyBySubject$.next(null)
    this.destroyBySubject$.unsubscribe()
  }
}
