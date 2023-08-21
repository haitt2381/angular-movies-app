import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { MovieDetailComponent } from './pages/movies/movie-detail/movie-detail.component';
import { RatingComponent } from './pages/movies/rating/rating.component';
import { MovieComponent } from './pages/movies/movie/movie.component';
import { LoadingComponent } from './shared/UI/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    MoviesComponent,
    ToolbarComponent,
    MovieDetailComponent,
    RatingComponent,
    MovieComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
