import { TestBed, inject, getTestBed } from '@angular/core/testing';

import {
  BaseRequestOptions,
  Headers, Http, HttpModule,
  Response, ResponseOptions, RequestOptions,
  URLSearchParams, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { API_BASE_URL, API_KEY,  TmdbDataService } from './tmdb-data.service';

import { Movie } from '../models/movie';
import { TmdbResponse } from '../models/tmdb-response';
import { TmdbRawMovieResponse, TmdbRawResponse } from '../models/tmdb-raw-response';

describe('TmdbDataService', () => {
  let service: TmdbDataService;
  let rawMovie: TmdbRawMovieResponse;
  let rawMovies: TmdbRawMovieResponse[];
  let expectedMovie: Movie;
  let mockBackend: MockBackend;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        TmdbDataService,
        Http,
        MockBackend,
        BaseRequestOptions,
        { provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
      ]
    });


    mockBackend = getTestBed().get(MockBackend);

    rawMovie = {
      id: 1, title: 'Tmdb movie', popularity: 99.9,
      poster_path: 'path/', release_date: new Date(), overview: 'Tmdb overview',
    };

    rawMovies = [
      rawMovie, rawMovie, rawMovie
    ];

    expectedMovie = {
      id: rawMovie.id, title: rawMovie.title, popularity: rawMovie.popularity,
      posterPath: rawMovie.poster_path, overview: rawMovie.overview,
      releaseDate: rawMovie.release_date,
    };

  });

  beforeEach(inject([TmdbDataService], (_service) => {
    service = _service;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse TmdbMovie', () => {
    expect(service.parseTmdbMovie(rawMovie)).toEqual(expectedMovie);
  });

  it('should parse array of TmdbMovies', () => {

    const expectedMovies: Movie[] = [
      expectedMovie, expectedMovie, expectedMovie
    ];

    expect(service.parseTmdbMovies(rawMovies)).toEqual(expectedMovies);
  });

  it('should parse TmdbResponse', () => {
    const rawResponse: TmdbRawResponse = {
      page: 1,
      total_results: 2,
      total_pages: 1,
      results: rawMovies,
    };

    const expectedResponse: TmdbResponse = {
      page: 1,
      totalResults: rawResponse.total_results,
      totalPages: rawResponse.total_pages,
      results: service.parseTmdbMovies(rawMovies),
    };

    expect(service.parseTmdbResponse(rawResponse)).toEqual(expectedResponse);
  });

  it('should build searchParams', () => {
    let expectedParams = 'page=1&sort_by=popularity.desc';
    let paramObj = { page: 1, sort_by: 'popularity.desc' };

    expect(service.buildSearchParams(paramObj).toString())
    .toBe(expectedParams);

    expectedParams = 'page=2&sort_by=popularity.asc';
    paramObj = { page: 2, sort_by: 'popularity.asc' };

    expect(service.buildSearchParams(paramObj).toString())
    .toBe(expectedParams);
  });

  it('should getMovies', () => {
    const paramObj = { page: 1, sort_by: 'popularity.desc' };
    mockBackend.connections.subscribe(
      (connection: MockConnection)  => {
            expect(connection.request.url).toEqual(API_BASE_URL + '&' + service.buildSearchParams(paramObj).toString());
        });

    service.getMovies(paramObj);

  });

  it('should getPopularMoviesByPage', () => {
    spyOn(service, 'getMovies');

    service.getPopularMoviesByPage(2);
    expect(service.getMovies)
    .toHaveBeenCalledWith({ page: '2', sort_by: 'popularity.desc' });

    service.getPopularMoviesByPage(3, 'asc');
    expect(service.getMovies)
    .toHaveBeenCalledWith({ page: '3', sort_by: 'popularity.asc' });
  });

});
