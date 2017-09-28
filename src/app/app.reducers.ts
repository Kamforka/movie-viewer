import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

import * as fromMovies from './movies/store/movies.reducers';
// import * as fromRouter from '@ngrx/router-store';


export interface State {
  movies: fromMovies.State;
}

const reducers = {
  movies: fromMovies.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getMoviesState = (state: State) => state.movies;
export const getMoviesLoading = createSelector(getMoviesState, fromMovies.getLoading);
export const getMoviesLoaded = createSelector(getMoviesState, fromMovies.getLoaded);
export const getMoviesError = createSelector(getMoviesState, fromMovies.getError);
export const getMoviesMovies = createSelector(getMoviesState, fromMovies.getMovies);
export const getMoviesSelected = createSelector(getMoviesState, fromMovies.getSelected);
export const getMoviesSelectedPage = createSelector(getMoviesState, fromMovies.getSelectedPage);
export const getMoviesTotalResults = createSelector(getMoviesState, fromMovies.getTotalResults);
export const getMoviesTotalPages = createSelector(getMoviesState, fromMovies.getTotalPages);
