import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-hero',
  templateUrl: './main-hero.component.html',
  styleUrls: ['./main-hero.component.scss']
})
export class MainHeroComponent implements OnInit {
  private userService = inject(UserService)

  loggedInUser$!: Observable<User | null>
  lorem = `Rent the car of your dreams. Unbeatable prices,
  flexible pick-up options and much more. Just make your bid.`

  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser$
  }
}
