import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { LoaderService } from 'src/app/services/loader.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
// import { CarService } from 'src/app/services/car.service.back';


@Component({
  selector: 'car-edit-page',
  templateUrl: './car-edit-page.component.html',
  styleUrls: ['./car-edit-page.component.scss']
})
export class CarEditPageComponent implements OnInit {

  private loggedInUserSubscription?: Subscription

  private carService = inject(CarService)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private loaderService = inject(LoaderService)

  form!: FormGroup
  dateFormat = 'yyyy/MM/dd';

  constructor() {
    this.form = this.fb.group({
      model: ['', Validators.required],
      mark: ['', Validators.required],
      year: ['', [Validators.required, CustomValidators.unRelevantYear]],
      rentStart: [this.formatTime(Date.now())],
      rentEnd: [this.formatTime(Date.now())],
      imgUrl: `.../../assets/rental/default.png`
    })
  }

  car!: any

  ngOnInit(): void {
    this.loaderService.setIsLoading(false)
    this.route.data
      .pipe(
        map(data => data['car']),
        filter(car => !!car)
      )
      .subscribe(car => {
        car.rentStart = this.formatTime(car.rentStart)
        car.rentEnd = this.formatTime(car.rentEnd)
        this.car = car
        this.form.patchValue(car)
      })
  }

  onSaveCar() {
    const car = { ...this.car, ...this.form.value }
    this.carService.saveCar(car)
      .subscribe({
        next: () => this.router.navigateByUrl('/car')
      })
  }

  formatTime(date: Date | number | string) {
    return new Date(date).toISOString().slice(0, 10)
  }

}
