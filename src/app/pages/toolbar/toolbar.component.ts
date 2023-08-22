import {Component} from '@angular/core';
import {faMagnifyingGlass, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  isExpanded : boolean = false;
  timeEventId: any;
  
  constructor(
      private router: Router,
      private themeService: ThemeService
  ) {
  }
  
  expandSearch() {
    this.isExpanded  = true;
    setTimeout(() => {
      document.getElementById("searchInput")?.focus();
    });
  }

  collapseSearch($event: FocusEvent) {
   if(!($event.target as HTMLInputElement).value) {
     this.isExpanded  = false;
   }
  }

  onSearch($event: Event) {
    clearTimeout(this.timeEventId);
    let searchValue: string | null = ($event.target as HTMLInputElement).value;
    if(searchValue.trim() === '') {
      searchValue = null;
    }
    if (($event as KeyboardEvent).key === 'Enter') {
      this.router.navigate([], { queryParams: {query: searchValue} }).then();
    } else {
      this.timeEventId = setTimeout(() => {
        this.router.navigate([], { queryParams: {query: searchValue} }).then();
      }, 1500)
    }
  }
  
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;

  onChangeTheme() {
    let theme = this.themeService.theme.value === 'light' ? 'dracula' : 'light';
    this.themeService.theme.next(theme);
  }
}
