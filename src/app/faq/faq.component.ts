import { Component } from '@angular/core';


@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  isAns1: boolean = false
  isAns2: boolean = false
  isAns3: boolean = false

  // panelTitleBackgroundColor: string = 'white';

  // onPanelOpened() {
  //   this.panelTitleBackgroundColor = 'orange';
  // }

  // onPanelClosed() {
  //   this.panelTitleBackgroundColor = 'white';
  // }
}
