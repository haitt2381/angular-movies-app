import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import * as Tool from "../shared/util/tool";
import {Discover} from "../shared/enum/discover";

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
        page = page ? page : 1;
        discover = Tool.checkEnum(Discover, discover, Discover.POPULAR);
        let headers = this.authService.getHeaderWithAuth();
        return this.http.get(`https://api.themoviedb.org/3/movie/${discover}?language=en-US&page=${page}`, {headers})
    }
}
