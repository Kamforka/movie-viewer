import * as movies from './movies.actions';
import { Movie } from '../models/movie';

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  totalPages: number;
  selectedPage: number;
  totalResults: number;
  movies: Movie[];
  selectedMovie: Movie;
}

const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  totalPages: 0,
  selectedPage: 0,
  totalResults: 0,
  movies: [],
  selectedMovie: null,
};

export function reducer(state = initialState, action: movies.Actions): State {
  switch (action.type) {
    case movies.GET_MOVIES:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        error: false,
      });
    case movies.GET_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false,
        totalPages: action.payload.totalPages,
        selectedPage: action.payload.page,
        totalResults: action.payload.totalResults,
        movies: action.payload.results,
      });
    case movies.GET_MOVIES_FAIL:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
      });
    case movies.SELECT_MOVIE:
      return Object.assign({}, state, {
        selectedMovie: action.payload,
      });

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getMovies = (state: State) => state.movies;
export const getSelected = (state: State) => state.selectedMovie;
export const getSelectedPage = (state: State) => state.selectedPage;
export const getTotalResults = (state: State) => state.totalResults;
export const getTotalPages = (state: State) => state.totalPages;
