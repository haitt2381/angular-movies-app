import {Component, OnInit} from '@angular/core';
import {faCalendar, faFire, faHeart} from "@fortawesome/free-solid-svg-icons";
import {GenresService} from "../../services/genres.service";
import {Genre} from "../../shared/model/genre";
import {Discover} from "../../shared/enum/discover";
import {ActivatedRoute, Router} from "@angular/router";
import * as Tool from "../../shared/util/tool";
import {GetMoviesRequest} from "../../shared/model/get-movies-request";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
    genres: Genre[] = [];
    discoverActive: string = Discover.POPULAR;
    genreSelected: string = '';
    
    constructor(
        private genresService: GenresService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: GetMoviesRequest) => {
            this.discoverActive = Tool.checkEnum(Discover, params.discover);
            this.genreSelected = '';
            if(Tool.isEmpty(this.discoverActive)) {
                this.genreSelected = params.genre_id + ''
            }
        })
        this.genresService.getGenres().subscribe(resp => {
            this.genres = resp['genres'];
        });
    }

    onDiscoverChange(discover: Discover) {
        this.router.navigate([], {queryParams: {discover: discover}}).then(); 
    }

    onGenreChange($event: Event) {
        let genreSelected = ($event.target as HTMLInputElement).value;
        this.router.navigate([], {
            queryParams: {discover: null, query: null, genre_id: genreSelected},
            queryParamsHandling: 'merge', // or 'preserve'
        }).then();
    }

    protected readonly faHeart = faHeart;
    protected readonly faFire = faFire;
    protected readonly faCalendar = faCalendar;
    protected readonly Discover = Discover;
}
