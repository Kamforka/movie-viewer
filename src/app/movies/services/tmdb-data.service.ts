import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie';
import { TmdbResponse } from '../models/tmdb-response';
import { TmdbRawMovieResponse, TmdbRawResponse } from '../models/tmdb-raw-response';

export const API_KEY = '4ff9d08260ed338797caa272d7df35dd';
export const API_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

@Injectable()
export class TmdbDataService {

  constructor(private http: Http) { }

  getMovies(paramObj: Object = {}): Observable<TmdbResponse> {
    const headers = new Headers();

    const searchParams = this.buildSearchParams(paramObj);

    const options = new RequestOptions({headers: headers, params: searchParams});

    return this.http.get(`${API_BASE_URL}`, options)
    .map((response: Response) => {
      const data = response.json();
      return this.parseTmdbResponse(data);
    });
  }

  getPopularMoviesByPage(page: number, order: string = 'desc'): Observable<TmdbResponse> {
    return this.getMovies({page: `${page}`, sort_by: `popularity.${order}`});
  }

  // helpers
  buildSearchParams(paramObj: Object = {}): URLSearchParams {
    const searchParams = new URLSearchParams();
    for (const p in paramObj) {
      if (p) {
        const v = paramObj[p];
        searchParams.set(p, v);
      }
    }

    return searchParams;
  }

  parseTmdbResponse(rawResponse: TmdbRawResponse): TmdbResponse {
    const tmdbResponse: TmdbResponse = {
      page: rawResponse.page,
      totalPages: rawResponse.total_pages,
      totalResults: rawResponse.total_results,
      results: this.parseTmdbMovies(rawResponse.results),
    };

    return tmdbResponse;
  }

  parseTmdbMovies(rawMovies: TmdbRawMovieResponse[]): Movie[] {
    const movies: Movie[] = rawMovies.map((rawMovie: TmdbRawMovieResponse) => {
      return this.parseTmdbMovie(rawMovie);
    });

    return movies;
  }

  parseTmdbMovie(rawMovie: TmdbRawMovieResponse): Movie {
      const movie: Movie = {
        id: rawMovie.id,
        title: rawMovie.title,
        popularity: rawMovie.popularity,
        posterPath: rawMovie.poster_path,
        overview: rawMovie.overview,
        releaseDate: new Date(rawMovie.release_date),
      };

      return movie;
  }
}
