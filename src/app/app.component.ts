import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  movies: any[] = [];

  constructor(private service: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.service.getMovies().subscribe(res => {
      console.log('Datos recibidos:', res);
      this.movies = res;
    });
  }

  deleteMovie(id: string) {
    this.service.deleteMovie(id).subscribe(() => {
      this.loadMovies();
    });
  }
}