
import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

import { Store } from '@ngrx/store';
import { reducer } from '../../app.reducers';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../app.reducers';

import { TmdbDataService } from '../services/tmdb-data.service';
import { MoviesEffects } from './movies.effects';
import * as movies from './movies.actions';

import { Movie } from '../models/movie';
import { TmdbResponse } from '../models/tmdb-response';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

describe('torrents effects', () => {
  let moviesEffects: MoviesEffects;
  let runner: EffectsRunner;
  let service: TmdbDataService;
  let store: Store<fromRoot.State>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule,
      StoreModule.provideStore(reducer),
    ],
    providers: [
      MoviesEffects,
      TmdbDataService,
    ]
  }));

  beforeEach(inject([EffectsRunner, MoviesEffects, TmdbDataService, Store],
    (_runner, _torrentsEffects, _service, _store: Store<fromRoot.State>) => {
    runner = _runner;
    moviesEffects = _torrentsEffects;
    service = _service;
    store = _store;
  }));

  it('should return a GetMoviesSuccessAction after getting response', () => {
    const serviceResponse = null;
    spyOn(service, 'getPopularMoviesByPage').and.returnValue(Observable.of(serviceResponse));

    runner.queue({ type: movies.GET_MOVIES });

    moviesEffects.getMovies$.subscribe(result => {
      expect(result).toEqual(new movies.GetMoviesSuccessAction(serviceResponse));
    });
  });

  it('should return a GetMoviesFailAction after api throws error', () => {
    spyOn(service, 'getPopularMoviesByPage').and.returnValue(Observable.throw('error'));

    runner.queue({ type: movies.GET_MOVIES  });

    moviesEffects.getMovies$.subscribe(result => {
      expect(result).toEqual(new movies.GetMoviesFailAction());
    });
  });

  it('should return a SelectMovieAction after GetMoviesSuccessAction', () => {
    const expectedResults: Movie[] = [
      { id: 1, title: 'Movie 1', popularity: 100.0, posterPath: 'dummyLink1', overview: 'Overview 1', releaseDate: new Date() },
      { id: 2, title: 'Movie 2', popularity: 99.0, posterPath: 'dummyLink2', overview: 'Overview 2', releaseDate: new Date() },
    ];
    const expectedResponse: TmdbResponse = {
      page: 1,
      totalPages: 1,
      totalResults: 2,
      results: expectedResults,
    };

    runner.queue({ type: movies.GET_MOVIES_SUCCESS, payload: expectedResponse});

    moviesEffects.getMoviesSuccess$.subscribe(result => {
      expect(result).toEqual(new movies.SelectMovieAction(expectedResponse.results[0]));
    });

  });

});
