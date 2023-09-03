import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Bid, Car } from 'src/app/models/car.model'

@Component({
  selector: 'bid-rent',
  templateUrl: './bid-rent.component.html',
  styleUrls: ['./bid-rent.component.scss']
})
export class BidRentComponent {

  private makeBidSubscription: Subscription | undefined

  @Input() car: Car | null = null
  @Input() bestBid: Bid = { bidAmount: 0 }
  @Output() makeBid = new EventEmitter<number>()

  private fb = inject(FormBuilder)

  form!: FormGroup

  constructor() {
    this.form = this.fb.group({
      bids: ["", [Validators.required]],
    })

    this.makeBidSubscription = this.makeBid.subscribe((bidValue: number) => {
      this.resetInput(bidValue)
    })
  }

  private resetInput(bidValue: number) {
    this.form.get('bids')?.setValue('')
  }

  ngOnDestroy() {
    if (this.makeBidSubscription) {
      this.makeBidSubscription.unsubscribe()
    }
  }
  
}
