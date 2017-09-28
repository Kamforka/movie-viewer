import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieBrowserComponent } from './components/movie-browser/movie-browser.component';

const routes: Routes = [
  { path: '', component: MovieBrowserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
