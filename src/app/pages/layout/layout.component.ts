import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme.service";

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
}
