import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      cover: ['', Validators.required]
    });
  }

  addMovie() {
    if (this.movieForm.valid) {
      this.movieService.addMovie(this.movieForm.value).subscribe({
        next: () => {
          alert('🎬 Película agregada correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('❌ Error al agregar película', err)
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
