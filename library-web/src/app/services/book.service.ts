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
  getBookByTitle(title: string): Observable<Book[]> {
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

  // méthodes pour les recherche par 2 critères

  getBooksByGenreAndYear(year: number, genre: string): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}/year/${year}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }

  getBooksByGenreAndRatingSup(genre: string, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByGenreAndRatingInf(genre: string, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByAuthorAndYear(author: string, year: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/year/${year}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByAuthorAndRatingSup(author: string, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByAuthorAndRatingInf(author: string, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByYearAndRatingSup(year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/year/${year}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByYearAndRatingInf(year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/year/${year}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }

  // méthode pour la recherche par 3 critères

  getBooksByGenreAndYearAndRatingSup(genre: string, year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}/year/${year}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByGenreAndYearAndRatingInf(genre: string, year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}/year/${year}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  
  getBooksByAuthorAndYearAndRatingSup(author: string, year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/year/${year}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getBooksByAuthorAndYearAndRatingInf(author: string, year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/year/${year}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }

  getBooksByGenreAndAuthorAndYear(genre: string, author: string, year: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/genre/${genre}/author/${author}/year/${year}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getByAuthorAndGenreAndYearAndRatingSup(author: string, genre: string, year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/genre/${genre}/year/${year}/ratingSup/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }
  getByAuthorAndGenreAndYearAndRatingInf(author: string, genre: string, year: number, rating: number): Observable<Book[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/author/${author}/genre/${genre}/year/${year}/ratingInf/${rating}`).pipe(
      map(booksJson => booksJson.map(bookJson => new Book().fromJson(bookJson)))
    );
  }

  // suppression d'un livre
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/id/${id}`);
  }

  // modification d'un livre
  updateBook(book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/`, book.toJson());
  }

  // ajout d'un livre
  addBook(book: any): void {
    this.http.post(`${this.apiUrl}/`, book, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response) => console.log('Livre ajouté avec succès:', response),
      error: (err) => console.error('Erreur lors de l\'ajout du livre:', err)
    });
  }  
}
