import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieId!: number;
  movie: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovie();
  }

  loadMovie(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (data: any) => {
        this.movie = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar la película:', err);
        this.error = 'No se pudo cargar la película';
        this.isLoading = false;
      }
    });
  }

  deleteMovie(): void {
    if (confirm('¿Seguro que deseas eliminar esta película?')) {
      this.movieService.deleteMovie(this.movieId).subscribe({
        next: () => {
          alert('Película eliminada correctamente');
          this.router.navigate(['/movies']);
        },
        error: (err) => console.error('Error al eliminar película', err)
      });
    }
  }
}
