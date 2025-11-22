import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error('❌ Error al cargar películas', err)
    });
  }

  deleteMovie(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta película?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          alert('🗑️ Película eliminada correctamente');
          this.loadMovies(); // recarga la lista después de eliminar
        },
        error: (err) => console.error('❌ Error al eliminar película', err)
      });
    }
  }
}
