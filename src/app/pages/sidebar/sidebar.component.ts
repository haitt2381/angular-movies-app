import { Component } from '@angular/core';
import {faCalendar, faCoffee, faFire, faHeart} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    protected readonly faCoffee = faCoffee;
    protected readonly faHeart = faHeart;
    protected readonly faFire = faFire;
    protected readonly faCalendar = faCalendar;
}
