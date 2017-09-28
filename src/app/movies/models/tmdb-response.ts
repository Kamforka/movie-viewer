import { Movie } from './movie';

export interface TmdbResponse {
  page: number;
  totalResults: number;
  totalPages: number;
  results: Movie[];
}
