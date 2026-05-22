import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html'
})
export class EditMovieComponent implements OnInit {

  movieForm: FormGroup;
  movieId!: string;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.movieForm = this.fb.group({
      titulo: ['', Validators.required],
      sinopsis: ['', Validators.required],
      anio: ['', Validators.required],
      cover: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.movieId = this.route.snapshot.paramMap.get('id')!;

    this.movieService.getMovieById(this.movieId).subscribe({

      next: (data) => {

        console.log('VIDEOJUEGO:', data);

        this.movieForm.patchValue({
          titulo: data.titulo,
          sinopsis: data.sinopsis,
          anio: data.anio,
          cover: data.cover
        });

      },

      error: (err) => {
        console.error('ERROR:', err);
      }

    });

  }

  updateMovie(): void {

    if (this.movieForm.invalid) {
      alert('Completa todos los campos');
      return;
    }

    this.movieService.updateMovie(
      this.movieId,
      this.movieForm.value
    ).subscribe({

      next: () => {

        alert('✅ Videojuego actualizado');

        this.router.navigate(['/movies']);

      },

      error: (err) => {
        console.error('ERROR:', err);
      }

    });

  }

}