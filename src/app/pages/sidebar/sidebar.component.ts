import {Component, OnInit} from '@angular/core';
import {faCalendar, faFire, faHeart} from "@fortawesome/free-solid-svg-icons";
import {GenresService} from "../../services/genres.service";
import {Genre} from "../../shared/model/genre";
import {Discover} from "../../shared/enum/discover";
import {ActivatedRoute, Router} from "@angular/router";
import * as Tool from "../../shared/util/tool";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
    genres: Genre[] = [];
    discoverActive: string = Discover.POPULAR;
    
    constructor(
        private genresService: GenresService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            let discoverParam = params.get("discover");
            this.discoverActive = Tool.checkEnum(Discover, discoverParam, Discover.POPULAR);
        })
        this.genresService.getGenres().subscribe(resp => {
            this.genres = resp['genres'];
        });
    }

    onDiscoverChange(discover: Discover) {
        this.router.navigate([], {
            queryParams: {discover: discover},
            queryParamsHandling: 'merge', // or 'preserve'
        }).then(); 
    }

    protected readonly faHeart = faHeart;
    protected readonly faFire = faFire;
    protected readonly faCalendar = faCalendar;
    protected readonly Discover = Discover;
}
