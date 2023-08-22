import {Component, OnInit} from '@angular/core';
import {faFilm, faLink} from "@fortawesome/free-solid-svg-icons";
import {CreditService} from "../../services/credit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Person} from "../../shared/model/person";
import {MovieService} from "../../services/movie.service";
import {Movie} from "../../shared/model/movie";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit{
  
  person: Person;
  recommendedMovies: Movie[] = [];
  
  constructor(
    private creditService: CreditService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let personId = this.route.snapshot.paramMap.get('id');
    this.creditService.getPersonById(personId).subscribe((resp: Person) => {
      this.person = resp;
      this.movieService.getMoviesByPerson(this.person.id).subscribe((resp: any) => {
        this.recommendedMovies = resp.cast;
      });
    });
  }

  onBack() {
    this.router.navigate(['/movies']).then();
  }
  
  protected readonly faLink = faLink;
  protected readonly faFilm = faFilm;
  protected readonly window = window;
}
