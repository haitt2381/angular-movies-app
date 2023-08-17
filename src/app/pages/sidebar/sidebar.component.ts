import {Component, OnInit} from '@angular/core';
import {faCalendar, faFire, faHeart} from "@fortawesome/free-solid-svg-icons";
import {GenresService} from "../../services/genres.service";
import {Genre} from "../../shared/model/genre";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
    genres: Genre[] = [];
    constructor(
        private genresService: GenresService
    ) {
    }

    ngOnInit(): void {
        this.genresService.getGenres().subscribe(resp => {
            this.genres = resp['genres'];
        });
    }

    protected readonly faHeart = faHeart;
    protected readonly faFire = faFire;
    protected readonly faCalendar = faCalendar;
}
