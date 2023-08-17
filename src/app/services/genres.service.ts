import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }
  
  getGenres(): Observable<any> {
    const TOKEN = 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2ZjNmUxZGQyMzFiZDFmMmNhYTE5OGU3MzE3YTZhNCIsInN1YiI6IjYwZWZiOTZlYTQ0ZDA5MDAyZDQ0ZjNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nvvleDHS5FWTK9UbhKfeuW8L5w4hyjGHAphNtQJuYSY'
    const headers: HttpHeaders = new HttpHeaders({ Authorization: TOKEN });
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?language=en',{headers});
  }
}
