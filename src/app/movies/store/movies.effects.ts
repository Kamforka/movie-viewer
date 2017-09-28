import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../app.reducers';
import * as movies from './movies.actions';

import { TmdbDataService } from '../services/tmdb-data.service';
import { TmdbResponse } from '../models/tmdb-response';

@Injectable()
export class MoviesEffects {

  @Effect()
  getMovies$: Observable<Action> = this.actions$
    .ofType(movies.GET_MOVIES)
    .map(toPayload)
    .switchMap((payload: number) => this.tmdb.getPopularMoviesByPage(payload)
      .map((response) => new movies.GetMoviesSuccessAction(response))
      .catch(() => Observable.of(new movies.GetMoviesFailAction()))
    );

  @Effect()
  getMoviesSuccess$: Observable<Action> = this.actions$
    .ofType(movies.GET_MOVIES_SUCCESS)
    .map(toPayload)
    .switchMap((payload: TmdbResponse) => Observable.of(new movies.SelectMovieAction(payload.results[0])));

  constructor(
    private actions$: Actions,
    private tmdb: TmdbDataService,
  ) {
  }

}
