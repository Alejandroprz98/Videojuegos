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
      titulo: ['', Validators.required],
      sinopsis: ['', Validators.required],
      anio: ['', Validators.required],
      cover: ['', Validators.required]
    });

  }

  addMovie() {

    console.log('FORM VALUE FINAL:', JSON.stringify(this.movieForm.value));

    if (this.movieForm.invalid) {
      return;
    }

    const data = this.movieForm.value;

    console.log('FORM DATA:', data);

    this.movieService.addMovie(data).subscribe({
      next: () => {
        alert('Videojuego agregado correctamente');
        this.movieForm.reset();
        this.router.navigate(['/movies']);
      },
      error: (err) => console.error('ERROR:', err)
    });

  }
}