import {Component, HostListener, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {MoviesResponse} from "../../shared/model/movies-response";
import {Discover} from "../../shared/enum/discover";
import {ActivatedRoute} from "@angular/router";
import {checkEnum} from "../../shared/util/tool";
import {Movie} from "../../shared/model/movie";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesResponse!: MoviesResponse;
  movies: Movie[] = [];
  discover: string = '';
  
  constructor(
      private movieService: MovieService,
      private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const discoverParam = params.get('discover');
      let discover = checkEnum(Discover, discoverParam, Discover.POPULAR);
      this.discover = discover;
      this.loadMoviesByDiscover(discover, true)
    });
    this.loadMoviesByDiscover(Discover.POPULAR, true);
  }

  private loadMoviesByDiscover(discover: string, isReloadPage: boolean,page?: number) {
    this.movieService.getPopularMovies(discover, page).subscribe(resp => {
      if(isReloadPage) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // optional, adds smooth scrolling
        });
        this.moviesResponse = resp;
        this.movies = this.moviesResponse.results;
      } else {
        this.moviesResponse = resp;
        this.movies = this.movies.concat(this.moviesResponse.results);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled === scrollable) {
      let nextPage = this.moviesResponse.page + 1;
      this.loadMoviesByDiscover(this.discover, false, nextPage)
    }
  }

  protected readonly Math = Math;
}
