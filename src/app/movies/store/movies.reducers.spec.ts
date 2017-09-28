import { Action } from '@ngrx/store';

import * as movies from './movies.actions';
import { reducer, State } from './movies.reducers';

import { Movie } from '../models/movie';
import { TmdbResponse } from '../models/tmdb-response';



describe('movies reducer', () => {
  let initialState: State;
  let undefinedAction: Action;

  beforeEach(() => {
    undefinedAction = {
      type: 'UNDEFINED',
    };

  initialState = {
    loading: false,
    loaded: false,
    error: false,
    totalPages: 0,
    selectedPage: 0,
    totalResults: 0,
    movies: [],
    selectedMovie: null,
  };


  });

  it('should handle initial state', () => {
    expect(
      reducer(initialState, <movies.Actions>undefinedAction)
    )
      .toEqual(initialState);
  });

  it('should handle GetMoviesAction', () => {
    const expectedState = Object.assign({}, initialState, { loading: true });

    expect(
      reducer(initialState, new movies.GetMoviesAction())
    )
      .toEqual(expectedState);
  });

  it('should handle GetMoviesSuccessAction', () => {
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
    const expectedState = Object.assign({}, initialState, {
      loaded: true, totalPages: expectedResponse.totalPages,
      selectedPage: expectedResponse.page, totalResults: expectedResponse.totalResults,
      movies: expectedResponse.results,
    });

    expect(
      reducer(initialState, new movies.GetMoviesSuccessAction(expectedResponse))
    )
      .toEqual(expectedState);
  });

  it('should handle GetMoviesFailAction', () => {
    const expectedState = Object.assign({}, initialState, { error: true });

    expect(
      reducer(initialState, new movies.GetMoviesFailAction())
    )
      .toEqual(expectedState);
  });

  it('should handle SelectMovieAction', () => {
    const expectedMovie: Movie = {
      id: 1, title: 'Movie 1', popularity: 100.0,
      posterPath: 'dummyLink1', overview: 'Overview 1', releaseDate: new Date() };

    const expectedState = Object.assign({}, initialState, { selectedMovie: expectedMovie });

    expect(
      reducer(initialState, new movies.SelectMovieAction(expectedMovie))
    )
      .toEqual(expectedState);
  });

});
