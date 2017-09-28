import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './store/movies.effects';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieBrowserComponent } from './components/movie-browser/movie-browser.component';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { TmdbDataService } from './services/tmdb-data.service';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(MoviesEffects),
    FlexLayoutModule,
    FormsModule,
    MoviesRoutingModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
  ],
  declarations: [MovieBrowserComponent, MovieListComponent, MovieDetailComponent],
  providers: [TmdbDataService],
})
export class MoviesModule { }
