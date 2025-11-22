import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movieForm: FormGroup;
  movieId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      cover: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe({
        next: (movie) => this.movieForm.patchValue(movie),
        error: (err) => console.error('❌ Error al cargar la película', err)
      });
    }
  }

  updateMovie() {
    if (this.movieId && this.movieForm.valid) {
      this.movieService.updateMovie(this.movieId, this.movieForm.value).subscribe({
        next: () => {
          alert('✅ Película actualizada correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('❌ Error al actualizar película', err)
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
