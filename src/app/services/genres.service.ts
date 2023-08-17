import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
      private http: HttpClient,
      private authService: AuthService
  ) { }
  
  getGenres(): Observable<any> {
    let headers = this.authService.getHeaderWithAuth();
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?language=en',{headers});
  }
}
