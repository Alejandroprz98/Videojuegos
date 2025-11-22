import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // ✅ importa el módulo de rutas

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component'; // ✅ importa el componente de detalles
import { ReactiveFormsModule } from '@angular/forms';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent, //  declara el nuevo componente
    AddMovieComponent,
    EditMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, //  agrega el módulo de rutas
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
