import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, map } from 'rxjs'
import { take } from 'rxjs/operators'
import { Bid, Car } from 'src/app/models/car.model'
import { User } from 'src/app/models/user.model'
import { CarService } from 'src/app/services/car.service'
import { LoaderService } from 'src/app/services/loader.service'
// import { CarService } from 'src/app/services/car.service.back'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private carService = inject(CarService)
  private userService = inject(UserService)
  private loaderService = inject(LoaderService)

  detailsTitle: Array<string> = ['Model', 'Mark', 'Year', 'Doors', 'AC', 'Transmission', 'Fuel']

  loggedInUser$!: Observable<User | null>
  bestOffer$!: Observable<Bid | null>
  car$!: Observable<Car>

  bestBid: Bid = { bidAmount: 0 }
  date = Date.now() + 100000000
  car: any = null

  ngOnInit(): void {
    this.loaderService.setIsLoading(false)
    this.loggedInUser$ = this.userService.loggedInUser$

    this.car$ = this.route.data.pipe(
      map(data => {
        this.bestOffer(data['car'],)
        this.car = data['car']
        return data['car']
      }),
    )
  }

  bestOffer(car: Car) {
    this.car = car
    for (const bid of car.bids) {
      if (bid.bidAmount > this.bestBid.bidAmount) {
        this.bestBid = bid;
      }
    }
  }

  onMakeBid(bidAmount: any) {

    const carId = this.car._id
    this.carService.getCarById(carId)
      .subscribe(car => {
        this.loggedInUser$
          .pipe(take(1))
          .subscribe(user => {
            const userbid = {
              toCar: car.mark,
              byUser: user?.username,
              time: Date.now(),
              bidAmount: bidAmount.bids,
              date: this.date
            }

            const updatedCarBids = [...car.bids, userbid]
            const updatedCar: any = {
              ...car,
              bids: updatedCarBids,
            }
            const updatedUserBids = [...user!.bids, userbid]
            const updatedUser: any = {
              ...user,
              bids: updatedUserBids
            }

            this.carService.saveCar(updatedCar).subscribe({
              next: () => this.bestOffer(updatedCar),
            })

            this.userService.updateUser(updatedUser).subscribe({
            })
          }
          )
      }
      )
  }

}
