import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviesComponent} from "./pages/movies/movies.component";
import {MovieDetailComponent} from "./pages/movies/movie-detail/movie-detail.component";


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full'},
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  // Add more routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
