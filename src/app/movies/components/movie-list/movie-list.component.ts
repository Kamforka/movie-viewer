import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input()
  movies: Movie[];

  @Input()
  selectedMovie: Movie;

  @Output()
  selectMovie: EventEmitter<Movie> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectMovie(movie: Movie) {
    this.selectMovie.emit(movie);
  }

}
