import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/withLatestFrom';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../app.reducers';
import * as movies from '../../store/movies.actions';
import { Store } from '@ngrx/store';

import { Movie } from '../../models/movie';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.scss']
})
export class MovieBrowserComponent implements OnInit {
  pageSize = 20; // number of entries per page from TMDB

  error$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  movies$: Observable<Movie[]>;
  selectedMovie$: Observable<Movie>;
  selectedPage$: Observable<number>;
  totalResults$: Observable<number>;
  totalPages$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    // need to bind this to ngbTypeahead search functions
    // more on this: https://github.com/ng-bootstrap/ng-bootstrap/issues/917
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.error$ = this.store.select(fromRoot.getMoviesError);
    this.loading$ = this.store.select(fromRoot.getMoviesLoading);
    this.loaded$ = this.store.select(fromRoot.getMoviesLoaded);
    this.movies$ = this.store.select(fromRoot.getMoviesMovies);
    this.selectedMovie$ = this.store.select(fromRoot.getMoviesSelected);
    this.selectedPage$ = this.store.select(fromRoot.getMoviesSelectedPage);
    this.totalResults$ = this.store.select(fromRoot.getMoviesTotalResults);
    this.totalPages$ = this.store.select(fromRoot.getMoviesTotalPages);

    this.store.dispatch(new movies.GetMoviesAction());
  }


  onSelectMovie(movie: Movie) {
    this.store.dispatch(new movies.SelectMovieAction(movie));
  }

  onPageChange(page: number) {
    this.store.dispatch(new movies.GetMoviesAction(page));
  }

  search(text$: Observable<string>) {
   return text$
     .debounceTime(200)
     .distinctUntilChanged()
     .withLatestFrom(this.movies$)
     .map(([term, movies]) => term.length < 2 ? []
       : movies.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
     }

  formatter(movie: {title: string}): string {
    return movie.title;
  }

  onSearchMovie(selectItem: NgbTypeaheadSelectItemEvent) {
    this.onSelectMovie(selectItem.item);
  }

}
