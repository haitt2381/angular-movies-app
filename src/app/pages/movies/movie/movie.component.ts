import {Component, Input} from '@angular/core';
import {Movie} from "../../../shared/model/movie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  @Input() movie: Movie;
  constructor(private router: Router) {
  }
  
  getDetailMovie(id: number) {
    this.router.navigate(['/movies', id]).then();
  }

  onImageError($event: ErrorEvent) {
    ($event.target as HTMLInputElement).src = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2//eeLmDSnF4bODqpbSrRCrjzmgJgD.jpg';
  }
}
