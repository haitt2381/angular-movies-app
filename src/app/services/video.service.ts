import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }
  
  getVideoTrailers(movieId: number | string): Observable<any> {
    let headers = this.authService.getHeaderWithAuth();
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {headers});
  }
}
