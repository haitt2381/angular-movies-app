import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../../../services/movie.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MovieDetail} from "../../../shared/model/movieDetail";
import {CreditService} from "../../../services/credit.service";
import {Cast} from "../../../shared/model/cast";
import {CreditsResponse} from "../../../shared/model/credits-response";
import {faFilm, faLink} from "@fortawesome/free-solid-svg-icons";
import {Video} from "../../../shared/model/video";
import {VideoService} from "../../../services/video.service";
import {VideoResponse} from "../../../shared/model/video-response";
import {getRandomEl} from "../../../shared/util/tool";
import {MoviesResponse} from "../../../shared/model/movies-response";
import {Subscription} from "rxjs";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy{
  
  movie: MovieDetail = new MovieDetail();
  casts: Cast[] = [];
  videoTrailers: Video[];
  yearRelease: any;
  moviesResponse: MoviesResponse;

  recommendedSubscription: Subscription;
  constructor(
      private movieService: MovieService,
      private creditService: CreditService,
      private videoService: VideoService,
      private loadingService: LoadingService,
      private route: ActivatedRoute,
      private router: Router,
  ) {
  }
  
  ngOnInit(): void {
    this.loadMovieDetail();

    this.recommendedSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadMovieDetail();
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.recommendedSubscription.unsubscribe();
  }
  
  private loadMovieDetail() {
    this.loadingService.startLoading();
    let movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(movieId).subscribe(movie => {
      this.movie = movie;
      this.yearRelease = new Date(this.movie.release_date).getFullYear();

      this.creditService.getCredits(this.movie.id).subscribe((resp: CreditsResponse) => {
        this.casts = resp.cast;
      });

      this.videoService.getVideoTrailers(this.movie.id).subscribe((resp: VideoResponse) => {
        this.videoTrailers = resp.results;
      });
      this.movieService.getRecommendationMovies(this.movie.id).subscribe((resp: MoviesResponse) => {
        console.log(resp)
        this.moviesResponse = resp;
      });
      this.loadingService.stopLoading();
    });
  }

  onImageError($event: ErrorEvent) {
    ($event.target as HTMLInputElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE6U-Ew1nCPKowZkaHwrMieYY_1QEmaMIJk8TsRwfCf3WEW1jxk4li0ts2Z8UtKy6m8FI&usqp=CAU';
  }

  onPlayVideoTrailer() {
    let videoTrailer: Video = getRandomEl(this.videoTrailers);
    let iframeElement = document.getElementById('iframeVideo');
    (iframeElement as HTMLIFrameElement).src = 'https://www.youtube.com/embed/'+videoTrailer.key;
    (document.getElementById("videoTrailerModal") as any).showModal();

  }

  onGetActor(castId: number) {
    this.router.navigate(['/actor', castId]).then();
  }
  
  onBack() {
    this.router.navigate(['/movies']).then();
  }

  protected readonly window = window;
  protected readonly faLink = faLink;
  protected readonly faFilm = faFilm;
}
