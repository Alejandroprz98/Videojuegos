import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/api/movies';

  constructor(private http: HttpClient) {}

  // 🟢 Obtener todas las películas
  getMovies(): Observable<any[]> {
    console.log('👉 Llamando al endpoint de películas...');
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🟡 Obtener una película específica por ID
  getMovieById(id: number): Observable<any> {
    console.log(`🎬 Obteniendo detalles de la película con ID: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🟢 Agregar una nueva película
  addMovie(movie: any): Observable<any> {
    console.log('🎥 Agregando nueva película:', movie);
    return this.http.post<any>(this.apiUrl, movie);
  }

  // 🟣 Actualizar una película existente
  updateMovie(id: number, movie: any): Observable<any> {
    console.log(`✏️ Actualizando película con ID: ${id}`, movie);
    return this.http.put<any>(`${this.apiUrl}/${id}`, movie);
  }

  // (Opcional) 🔴 Eliminar una película
  deleteMovie(id: number): Observable<any> {
    console.log(`🗑️ Eliminando película con ID: ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
