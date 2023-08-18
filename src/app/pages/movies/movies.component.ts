import {Component, HostListener, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {MoviesResponse} from "../../shared/model/movies-response";
import {Discover} from "../../shared/enum/discover";
import {ActivatedRoute, Router} from "@angular/router";
import {checkEnum} from "../../shared/util/tool";
import {Movie} from "../../shared/model/movie";
import {GetMoviesRequest} from "../../shared/model/get-movies-request";
import {SortMovie} from "../../shared/enum/sort-movie";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesResponse!: MoviesResponse;
  movies: Movie[] = [];
  discover: string = '';
  sortActive: string = '';
  isLoading: boolean = false;
  params: GetMoviesRequest = {};
  
  constructor(
      private movieService: MovieService,
      private route: ActivatedRoute,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: GetMoviesRequest) => {
      if(params.discover) {
        let discover = checkEnum(Discover, params.discover, Discover.POPULAR);
        this.discover = discover;
        this.loadMoviesByDiscover(discover, true);
      } else {
        this.sortActive = checkEnum(SortMovie, params.sort_by);
        this.loadMovies(params, true);
        this.discover = '';
      }
    });
    this.loadMoviesByDiscover(Discover.POPULAR, true);
  }

  private loadMoviesByDiscover(discover: string, isReloadPage: boolean,page?: number) {
    this.movieService.getPopularMovies(discover, page).subscribe(resp => {
      this.handleLoadMovies(isReloadPage, resp);
    });
  }

  private loadMovies(request: GetMoviesRequest, isReloadPage: boolean) {
    this.movieService.getMovies(request).subscribe(resp => {
      this.handleLoadMovies(isReloadPage, resp);
    });
  }

  private handleLoadMovies(isReloadPage: boolean, response: any) {
    this.isLoading = false;
    if (isReloadPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // optional, adds smooth scrolling
      });
      this.moviesResponse = response;
      this.movies = this.moviesResponse.results;
    } else {
      this.moviesResponse = response;
      this.movies = this.movies.concat(this.moviesResponse.results);
    }
  }

  onSortChange($event: Event) {
    let valueSort: string | null = ($event.target as HTMLInputElement).value;
    valueSort = valueSort.trim() !== '' ? valueSort : null;
    this.router.navigate([], {
      queryParams: {sort_by: valueSort, discover: null},
      queryParamsHandling: 'merge',
    }).then();
  }

  onImageError($event: ErrorEvent) {
    ($event.target as HTMLInputElement).src = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2//eeLmDSnF4bODqpbSrRCrjzmgJgD.jpg';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(this.isLoading) {
      return;
    }
    
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > scrollable - 2500) {
      this.isLoading = true;
      let nextPage = this.moviesResponse.page + 1;
      if(checkEnum(Discover, this.discover)) {
        this.loadMoviesByDiscover(this.discover, false, nextPage);
      } else {
        this.params.page = nextPage;
        this.loadMovies(this.params, false);
      }
    }
  }

  protected readonly Math = Math;
}
