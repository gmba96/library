import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.model';
import { IBook } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = '/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<IBook[]>(this.apiUrl).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBookById(id: number): Observable<Book> {
    return this.http.get<IBook>(`${this.apiUrl}/id/${id}`).pipe(
      map(bookJson => new Book().fromJson(bookJson))
    );
  }
  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/title/${title}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByYear(year: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/year/${year}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByGenre(genre: string): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByRatingSup(rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByRatingInf(rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }

}
