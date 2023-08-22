import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {faBars, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  theme: string = 'light';
  
  constructor(
      private themeService: ThemeService
  ) {
  }
  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    })
  }

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faBars = faBars;
}
