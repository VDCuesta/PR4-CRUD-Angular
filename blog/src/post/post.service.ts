import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Metodos 

  // GET 
  getAll(): Observable<Post[]> {
    const URL = `${this.apiURL}/posts/`;
    return this.httpClient.get<Post[]>(URL)
                          .pipe(
                            catchError(error => of([]))
                          );
  }

  // CREATE 

  create(post: Post):  Observable<Post | null> {
    const URL = `${this.apiURL}/posts/`;

    return this.httpClient.post<Post>(URL, JSON.stringify(post),
                            this.httpOptions)
                            .pipe(
                              catchError(() => of(null))
                            );
  }

  // BUSCAR 

  find(id: number): Observable<Post | null> {
    const URL = `${this.apiURL}/posts/${id}`;

    return this.httpClient.get<Post>(URL)
                          .pipe(
                            catchError(() => of(null))
                          );

  }

  // ACTUALIZAR 

  update(id: number, post: Post): Observable<Post | null> {
    // return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
    const URL = `${this.apiURL}/posts/${id}`;
    
    return this.httpClient.put<Post>(URL, JSON.stringify(post), this.httpOptions)
                          .pipe(
                            catchError(() => of(null))
                          );

  }

  // BORRAR 
  delete(id: number) {
    // return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
    const URL = `${this.apiURL}/posts/${id}`;

    return this.httpClient.delete(URL, this.httpOptions)
  }

}
