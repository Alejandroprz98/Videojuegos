import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieId!: string;
  movie: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {

    this.movieId = this.route.snapshot.paramMap.get('id')!;

    this.loadMovie();

  }

  loadMovie(): void {

    this.movieService.getMovieById(this.movieId).subscribe({

      next: (data: any) => {

        console.log('VIDEOJUEGO:', data);

        this.movie = data;

        this.isLoading = false;

      },

      error: (err) => {

        console.error(err);

        this.error = 'No se pudo cargar el videojuego';

        this.isLoading = false;

      }

    });

  }

  deleteMovie(): void {

    if (confirm('¿Seguro que deseas eliminar?')) {

      this.movieService.deleteMovie(this.movieId).subscribe({

        next: () => {

          alert('Videojuego eliminado');

          this.router.navigate(['/movies']);

        }

      });

    }

  }

}