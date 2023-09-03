import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Bid, Car } from 'src/app/models/car.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'car-preview',
  templateUrl: './car-preview.component.html',
  styleUrls: ['./car-preview.component.scss']
})
export class CarPreviewComponent implements OnInit {

  private userService = inject(UserService)
  @Input() car!: Car
  @Output() remove = new EventEmitter<string>()
  @Output() select = new EventEmitter<Car>()

  loggedInUser$!: Observable<User | null>

  bestBid: Bid = { bidAmount: 0 }

  detailsTitle: Array<string> = ['Model', 'Mark', 'Year'];
  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser$
    this.bestOffer(this.car)
  }

  bestOffer(car: Car) {
    for (const bid of car.bids) {
      if (bid.bidAmount > this.bestBid.bidAmount) {
        this.bestBid = bid;
      }
    }
  }
}
