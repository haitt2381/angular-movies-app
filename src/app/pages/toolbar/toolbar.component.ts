import { Component } from '@angular/core';
import {faMagnifyingGlass, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;
}
