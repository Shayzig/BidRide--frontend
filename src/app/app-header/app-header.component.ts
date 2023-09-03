import { Component, OnInit} from '@angular/core'
import { UserService } from '../services/user.service'
import { User } from '../models/user.model'
import { Observable } from 'rxjs'
import { Bid } from '../models/car.model'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) { }

  isNavOpen: boolean = false
  loggedInUser$!: Observable<User | null>
  bestOffer$!: Observable<Bid | null>
  bestOfferAmount: number = 0
  userFormattedBids: Bid[] = []
  isLogin: boolean = true
  visible: boolean = false;

  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser$
    this.loadUserBids()

  }

  clickMe(): void {
    this.visible = false;
  }

  loadUserBids() {
    this.loggedInUser$.subscribe((loggedInUser) => {
      if (loggedInUser) {
        const uniqueBids: Bid[] = []
        const carToHighestBidMap: Map<string, Bid> = new Map()

        loggedInUser.bids.forEach((bid: Bid) => {
          const carId = bid.toCar

          if (!carToHighestBidMap.has(carId)) {
            carToHighestBidMap.set(carId, bid)
          } else {
            const currentHighestBid = carToHighestBidMap.get(carId) as Bid
            if (bid.bidAmount > currentHighestBid.bidAmount) {
              carToHighestBidMap.set(carId, bid)
            }
          }
        })

        uniqueBids.push(...carToHighestBidMap.values())

        this.userFormattedBids = uniqueBids
      }
    })
  }

  logout() {
    this.userService.logout()
  }
}
