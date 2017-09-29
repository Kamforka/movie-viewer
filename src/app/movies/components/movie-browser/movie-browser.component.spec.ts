import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, } from '@angular/http';
import { By } from '@angular/platform-browser';

import { NgbModule, NgbPaginationConfig, NgbTypeaheadConfig, NgbTypeaheadSelectItemEvent   } from '@ng-bootstrap/ng-bootstrap';

import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import { reducer } from '../../../app.reducers';
import * as movies from '../../store/movies.actions';

import { MovieBrowserComponent } from './movie-browser.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { Movie } from '../../models/movie';

import { TmdbDataService } from '../../services/tmdb-data.service';

import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';

describe('MovieBrowserComponent', () => {
  let component: MovieBrowserComponent;
  let fixture: ComponentFixture<MovieBrowserComponent>;
  let store: Store<fromRoot.State>;
  let dummyMovie: Movie;

  let searchEl: DebugElement;
  let listEl: DebugElement;
  let pageEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        NgbModule,
        StoreModule.provideStore(reducer),
      ],
      declarations: [
        MovieBrowserComponent,
        MovieDetailComponent,
        MovieListComponent,
      ],
      providers: [
        NgbPaginationConfig,
        NgbTypeaheadConfig,
        TmdbDataService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dummyMovie = {
      id: 1, title: 'Dummy Movie', overview: 'A dummy movie',
      popularity: 999.999, posterPath: 'path/to/poster', releaseDate: new Date()
    };

    fixture = TestBed.createComponent(MovieBrowserComponent);
    component = fixture.componentInstance;

    searchEl = fixture.debugElement.query(By.css('#movie-search'));
    pageEl = fixture.debugElement.query(By.css('ngb-pagination'));

    store = fixture.debugElement.injector.get(Store);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch GetMoviesAction on init', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch)
    .toHaveBeenCalledWith(new movies.GetMoviesAction());
  });

  it('should dispatch SelectMovieAction on select movie', () => {
    spyOn(store, 'dispatch');

    component.onSelectMovie(null);

    expect(store.dispatch)
    .toHaveBeenCalledWith(new movies.SelectMovieAction(null));
  });

  it('should dispatch GetMoviesAction on page change', () => {
    spyOn(store, 'dispatch');

    component.onPageChange(13);

    expect(store.dispatch)
    .toHaveBeenCalledWith(new movies.GetMoviesAction(13));
  });

  it('should call onSelectMovie through onSearchMovie', () => {
    spyOn(component, 'onSelectMovie');
    const selectItemEvent: NgbTypeaheadSelectItemEvent = {
      item: null,
      preventDefault: null,
    };

    component.onSearchMovie(selectItemEvent);
    expect(component.onSelectMovie)
    .toHaveBeenCalledWith(null);

  });

  it('should search amongst movies', () => {
    component.movies$ = Observable.of<Movie[]>([dummyMovie, dummyMovie]);

    let result = null;

    let text$ = Observable.of<string>('');
    component.search(text$).subscribe(_result => result = _result);
    expect(result).toEqual([]);

    text$ = Observable.of<string>(dummyMovie.title.slice(0, 2));
    component.search(text$).subscribe(_result => result = _result);
    expect(result).toEqual([dummyMovie, dummyMovie]);
  });

  it('should format movie title', () => {
    expect(component.formatter(dummyMovie)).toBe(dummyMovie.title);
  });

  it('should trigger onSearchMovie when a search item selected', () => {
    spyOn(component, 'onSearchMovie');
    searchEl.triggerEventHandler('selectItem', dummyMovie);
    expect(component.onSearchMovie).toHaveBeenCalledWith(dummyMovie);
  });

  it('should trigger onSelectMovie when a movie is selected', () => {
    component.loaded$ = Observable.of(true); // set loaded$ to display corresponding template
    fixture.detectChanges();
    listEl = fixture.debugElement.query(By.css('app-movie-list'));

    spyOn(component, 'onSelectMovie');
    listEl.triggerEventHandler('selectMovie', dummyMovie);
    expect(component.onSelectMovie).toHaveBeenCalledWith(dummyMovie);
  });

  it('should trigger onPageChange when a page is selected', () => {
    spyOn(component, 'onPageChange');
    pageEl.triggerEventHandler('pageChange', 12);
    expect(component.onPageChange).toHaveBeenCalledWith(12);
  });


});
