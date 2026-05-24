import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent {

  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {

    this.movieForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      sinopsis: ['', [Validators.required, Validators.minLength(10)]],
      anio: ['', [Validators.required,  Validators.min(1)]],
      cover: ['', [Validators.required]]
    });

  }

  addMovie() {

    // 🔥 Validación fuerte
    if (this.movieForm.invalid) {
      alert('❌ Completa todos los campos correctamente');
      this.movieForm.markAllAsTouched();
      return;
    }

    console.log('FORM VALUE FINAL:', JSON.stringify(this.movieForm.value));

    const data = this.movieForm.value;

    console.log('FORM DATA:', data);

    this.movieService.addMovie(data).subscribe({
      next: () => {
        alert('✅ Producto agregado correctamente');
        this.movieForm.reset();
        this.router.navigate(['/movies']);
      },
      error: (err) => console.error('❌ ERROR:', err)
    });

  }
}