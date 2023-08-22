import {Component, HostListener, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {MoviesResponse} from "../../shared/model/movies-response";
import {Discover} from "../../shared/enum/discover";
import {ActivatedRoute, Router} from "@angular/router";
import * as Tool from "../../shared/util/tool";
import {Movie} from "../../shared/model/movie";
import {GetMoviesRequest} from "../../shared/model/get-movies-request";
import {SortMovie} from "../../shared/enum/sort-movie";
import {LoadingService} from "../../services/loading.service";

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
  sortOptions: any[] = [];
  
  constructor(
      private movieService: MovieService,
      private loadingService: LoadingService,
      private route: ActivatedRoute,
      private router: Router
  ) {
    this.sortOptions = Object.keys(SortMovie).map(key => {
      return {label: Tool.capitalizeFirstLetter(key.replaceAll('_', ' ')), value: Tool.getEnumValue(SortMovie, key)}
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: GetMoviesRequest) => {
      this.params = params;
      this.loadingService.startLoading();
      if(Object.keys(params).length === 0) {
        this.loadMoviesByDiscover(Discover.POPULAR, true);
        this.router.navigate([], { queryParams: {discover: Discover.POPULAR}, queryParamsHandling: 'merge'}).then();
      } else if(params.discover) {
        let discover = Tool.checkEnum(Discover, params.discover, Discover.POPULAR);
        this.discover = discover;
        this.loadMoviesByDiscover(discover, true);
      } else if(params.query) {
        this.loadMoviesQuery(params.query, true);
      } else {
        this.sortActive = Tool.checkEnum(SortMovie, params.sort_by);
        this.loadMovies(params, true);
        this.discover = '';
      }
    });
  }

  private loadMoviesQuery(query: string, isReloadPage: boolean, page?: number) {
    this.movieService.getMoviesQuery(query, page).subscribe(resp => {
      this.handleLoadMovies(isReloadPage, resp);
    });
  }

  private loadMoviesByDiscover(discover: string, isReloadPage: boolean, page?: number) {
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
      window.scrollTo(0, 0);
      this.moviesResponse = response;
      this.movies = this.moviesResponse.results;
    } else {
      this.moviesResponse = response;
      this.movies = this.movies.concat(this.moviesResponse.results);
    }
    this.loadingService.stopLoading();
  }

  onSortChange($event: Event) {
    let valueSort: string | null = ($event.target as HTMLInputElement).value;
    valueSort = valueSort.trim() !== '' ? valueSort : null;
    this.router.navigate([], {
      queryParams: {sort_by: valueSort, discover: null, query: null},
      queryParamsHandling: 'merge',
    }).then();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(this.isLoading) {
      return;
    }
    
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > scrollable - 1000) {
      this.isLoading = true;
      let nextPage = this.moviesResponse.page + 1;
      if(Tool.checkEnum(Discover, this.discover)) {
        this.loadMoviesByDiscover(this.discover, false, nextPage);
      } else if (this.params.query){
        this.loadMoviesQuery(this.params.query, false, nextPage);
      } else {
        this.params.page = nextPage;
        this.loadMovies(this.params, false);
      }
    }
  }
}
