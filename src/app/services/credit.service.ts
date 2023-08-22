import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  getCredits(movieId: any): Observable<any> {
    let headers = this.authService.getHeaderWithAuth();
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {headers})
  }
  
  getPersonById(personId: any): Observable<any> {
    let headers = this.authService.getHeaderWithAuth();
    return this.http.get(`https://api.themoviedb.org/3/person/${personId}`, {headers})
  }
}
