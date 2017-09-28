import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';

import { Movie } from '../../models/movie';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectMovie on select movie', () => {
    const dummyMovie = {
      id: 1, title: 'Dummy Movie', overview: 'A dummy movie',
      popularity: 999.999, posterPath: 'path/to/poster', releaseDate: new Date()
    };
    spyOn(component.selectMovie, 'emit');

    component.onSelectMovie(dummyMovie);

    expect(component.selectMovie.emit)
    .toHaveBeenCalledWith(dummyMovie);
  });
});
