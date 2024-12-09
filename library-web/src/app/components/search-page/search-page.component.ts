import { Component, OnInit, NgModule} from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})

export class SearchPageComponent implements OnInit {
  books: Book[] = []; // Liste initiale des livres

  searchCriteria = {
    id: null,
    title: '',
    author: '',
    rating: null,
    year: null,
    genre: ''
  };

  onSearch(): void {
    // Vérifiez chaque champ et appelez la fonction correspondante si un champ est rempli
    if (this.searchCriteria.id) {
      this.searchById(this.searchCriteria.id);
    }
    if (this.searchCriteria.title.trim()) {
      this.searchByTitle(this.searchCriteria.title);
    }
    if (this.searchCriteria.author.trim()) {
      this.searchByAuthor(this.searchCriteria.author);
    }
    if (this.searchCriteria.rating) {
      this.searchByRating(this.searchCriteria.rating);
    }
    if (this.searchCriteria.year) {
      this.searchByYear(this.searchCriteria.year);
    }
    if (this.searchCriteria.genre.trim()) {
      this.searchByGenre(this.searchCriteria.genre);
    }

    // Ajoutez une logique si aucun champ n'a été rempli
    if (
      !this.searchCriteria.id &&
      !this.searchCriteria.title.trim() &&
      !this.searchCriteria.author.trim() &&
      !this.searchCriteria.rating &&
      !this.searchCriteria.year &&
      !this.searchCriteria.genre.trim()
    ) {
      this.ngOnInit();
    }
  }

  searchById(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (response) => {
        this.books = [response]; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  searchByTitle(title: string): void {
    this.bookService.getBooksByTitle(title).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  searchByAuthor(author: string): void {
    this.bookService.getBooksByAuthor(author).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  searchByRating(rating: number): void {
    this.bookService.getBooksByRatingSup(rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  searchByYear(year: number): void {
    this.bookService.getBooksByYear(year).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  searchByGenre(genre: string): void {
    this.bookService.getBooksByGenre(genre).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Appeler le service pour obtenir les livres lors de l'initialisation
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }


  orderByYear(): void {
    this.books = [...this.books].sort((a, b) => b.year - a.year);
  }
  resetBooks(): void {
    this.books = [...this.books].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

  }

  onCheckBoxChange(event: any): void {
    if(event.target.checked){
      this.orderByYear();
    }
    else{
      this.resetBooks();
    }
  }
}