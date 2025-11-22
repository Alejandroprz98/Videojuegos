import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },            // Listado de películas
  { path: 'movie/:id', component: MovieComponent },    // Detalles de una película
  { path: 'movies/add', component: AddMovieComponent }, // Agregar película
  { path: 'movies/edit/:id', component: EditMovieComponent }, // Editar película
  { path: '**', redirectTo: '' }                       // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
