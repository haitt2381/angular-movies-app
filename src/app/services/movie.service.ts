import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import * as Tool from "../shared/util/tool";
import {Discover} from "../shared/enum/discover";
import {GetMoviesRequest} from "../shared/model/get-movies-request";

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
    }
    
    getPopularMovies(discover: string, page?: number): Observable<any> {
        page = page ?? 1;
        discover = Tool.checkEnum(Discover, discover, Discover.POPULAR);
        let headers = this.authService.getHeaderWithAuth();
        return this.http.get(`https://api.themoviedb.org/3/movie/${discover}?language=en-US&page=${page}`, {headers})
    }
    
    getRecommendationMovies(movieId: number | string): Observable<any> {
        let headers = this.authService.getHeaderWithAuth();
        return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {headers})
    }
    
    getMovies(request: GetMoviesRequest): Observable<any> {
        let headers = this.authService.getHeaderWithAuth();
        let params = new HttpParams()
            .append('language', 'en-US')
            .append('page', request.page ? request.page : 1);
        if(request.sort_by) {
            params.append('sort_by', request.sort_by)
        }
        
        if(request.genre_id) {
            params.append('with_genres', request.genre_id)
        }
        
        return this.http.get(`https://api.themoviedb.org/3/discover/movie`, {headers, params})
    }
    
    getMovie(id: string | null): Observable<any> {
        let headers = this.authService.getHeaderWithAuth();
        return  this.http.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {headers});
    }
    
}
