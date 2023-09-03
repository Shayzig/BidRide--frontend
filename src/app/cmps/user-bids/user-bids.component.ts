import { Component, Input } from '@angular/core';
import { Bid } from 'src/app/models/car.model';

@Component({
  selector: 'user-bids',
  templateUrl: './user-bids.component.html',
  styleUrls: ['./user-bids.component.scss']
})
export class UserBidsComponent {
  @Input() userBids: Bid[] | null = null
}
