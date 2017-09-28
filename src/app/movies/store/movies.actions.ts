import { Action } from '@ngrx/store';

import { Movie } from '../models/movie';
import { TmdbResponse } from '../models/tmdb-response';

export const GET_MOVIES = '[Movies] Get Movies';
export const GET_MOVIES_SUCCESS = '[Movies] Get Movies Success';
export const GET_MOVIES_FAIL = '[Movies] Get Movies Fail';

export const SELECT_MOVIE = '[Movies] Select Movie';

export class GetMoviesAction implements Action {
  readonly type = GET_MOVIES;

  constructor (public payload: number = 1) {}
}

export class GetMoviesSuccessAction implements Action {
  readonly type = GET_MOVIES_SUCCESS;

  constructor(public payload: TmdbResponse) {}
}

export class GetMoviesFailAction implements Action {
  readonly type = GET_MOVIES_FAIL;
}

export class SelectMovieAction implements Action {
  readonly type = SELECT_MOVIE;

  constructor(public payload: Movie) {}
}

export type Actions
  = GetMoviesAction
  | GetMoviesSuccessAction
  | GetMoviesFailAction
  | SelectMovieAction;
