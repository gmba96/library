import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, FormsModule,],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})

export class SearchPageComponent implements OnInit {
  
  // configuration de la recherche
  books: Book[] = []; 
  constructor(private bookService: BookService, private router: Router) {}

  // définit les critères de recherche 
  searchCriteria = {
    id: null,
    title: '',
    author: '',
    rating: null,
    ratingComparison: 'sup',
    year: null,
    genre: ''
  };


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

  
  // ---------------------------------------filtrer les livres----------------------------------------------
  //par année
  orderByYear(event: any): void {
    if(event.target.checked){
      this.orderByYearDesc();
    }
    else{
      this.resetBooks();
    }
  }
  // par année descendante
  orderByYearDesc(): void {
    this.books = [...this.books].sort((a, b) => b.year - a.year);
  }
  //par note
  orderByRating(event: any): void {
    if(event.target.checked){
      this.orderByRatingDesc();
    }
    else{
      this.resetBooks();
    }
  }
  // par note descendante
  orderByRatingDesc(): void {
    this.books = [...this.books].sort((a, b) => b.rating - a.rating);
  }
  // revenir à l'ordre initial
  resetBooks(): void {
    this.books = [...this.books].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }

  // ---------------------------------------rechercher un livre----------------------------------------------

  onSearch(): void {
    const searchFields: { [key: string]: (value: any) => void } = {
      id: (value: any) => this.searchById(value),
      title: (value: any) => this.searchByTitle(value),
      author: (value: any) => this.searchByAuthor(value),
      genre: (value: any) => this.searchByGenre(value),
      year: (value: any) => this.searchByYear(value),
      rating: (value: any) => this.searchByRating(value),
    };
  
    // Filtrer les champs remplis
    const filledFields = Object.entries(this.searchCriteria).filter(
      ([key, value]) => key !== 'ratingComparison' && value !== null && value !== ''
    );

    // Aucun champ rempli : réinitialiser la liste des livres
    if (filledFields.length === 0) {
      this.ngOnInit();
      return;
    }
  
    // Si un seul champ est rempli : appel direct
    else if (filledFields.length === 1) {
      const [key, value] = filledFields[0];
      searchFields[key]?.(value);
      return;
    }
  
    // Gestion combinée de plusieurs champs
    const searchParams: { [key: string]: any } = Object.fromEntries(filledFields);
  
    // Cas spécifique : recherche par ID prioritaire et title
    if (searchParams['id']) {
      this.searchById(searchParams['id']);
      return;
    }
    else if (searchParams['title']) {
      this.searchByTitle(searchParams['title']);
      return;
    }
//---------------------------si 2 champs on été rempli----------------------------------------------
    else if (filledFields.length === 2){
      // Cas spécifique : combinaisons de champs
      if (searchParams['genre'] && searchParams['year']) {
        this.searchByGenreAndYear(searchParams['genre'], searchParams['year']);
        return;
      }
    
      else if (searchParams['genre'] && searchParams['rating']) {
        if (this.searchCriteria.ratingComparison === 'sup'){
          this.searchByGenreAndRatingSup(searchParams['genre'],searchParams['rating']);
        }
        else{
          this.searchByGenreAndRatingInf(searchParams['genre'], searchParams['rating']);
        }
        return;
      }
    
      else if (searchParams['author'] && searchParams['year']) {
        this.searchByAuthorAndYear(searchParams['author'], searchParams['year']);
        return;
      }
    
      else if (searchParams['author'] && searchParams['rating']) {
        if (this.searchCriteria.ratingComparison === 'sup'){
          this.searchByAuthorAndRatingSup(searchParams['author'], searchParams['rating']);
        }else{
          this.searchByAuthorAndRatingInf(searchParams['author'], searchParams['rating']);
        }
        return;
      }
    
      else if (searchParams['year'] && searchParams['rating']) {
        if(this.searchCriteria.ratingComparison === 'sup'){
          this.searchByYearAndRatingSup(searchParams['year'], searchParams['rating']);
        }else{
          this.searchByYearAndRatingInf(searchParams['year'], searchParams['rating']);
        }
      }
    }

//---------------------------si 3 champs on été rempli----------------------------------------------
    else if(filledFields.length === 3){
      if(searchParams['genre']  && searchParams['rating'] && searchParams['year']){
        if(this.searchCriteria.ratingComparison === 'sup'){
          this.searchByGenreAndYearAndRatingSup(searchParams['genre'], searchParams['year'], searchParams['rating']);
        }else{
          this.searchByGenreAndYearAndRatingInf(searchParams['genre'], searchParams['year'], searchParams['rating']);
        }
      }
      
      else if(searchParams['author'] && searchParams['year'] && searchParams['rating']){
        if(this.searchCriteria.ratingComparison === 'sup'){
          this.searchByAuthorAndYearAndRatingSup(searchParams['author'], searchParams['year'], searchParams['rating']);
        }else{
          this.searchByAuthorAndYearAndRatingInf(searchParams['author'], searchParams['year'], searchParams['rating']);
        }
      }
    }
    else if(filledFields.length > 3){
      if ((searchParams['author'] && searchParams['genre'] && searchParams['year'] && searchParams['rating'])){
        if(this.searchCriteria.ratingComparison === 'sup'){
          this.searchByAuthorAndGenreAndYearAndRatingSup(searchParams['author'], searchParams['genre'], searchParams['year'], searchParams['rating']);
        }else{
          this.searchByAuthorAndGenreAndYearAndRatingInf(searchParams['author'], searchParams['genre'], searchParams['year'], searchParams['rating']);
        }
      }
    }

    // Aucune recherche spécifique pour cette combinaison de champs
    else{
      console.warn('Aucune recherche spécifique pour cette combinaison de champs.');
    }
  }
  
//--------------------------------------- les fonction pour rechercher un livre----------------------------------------------

//par id
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

//par titre
  searchByTitle(title: string): void {
    const encodedTitle = encodeURIComponent(title.trim());
    this.bookService.getBookByTitle(encodedTitle).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  //par auteur
  searchByAuthor(author: string): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    this.bookService.getBooksByAuthor(encodedAuthor).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  
  //par note
  searchByRating(rating: number): void {
    if (this.searchCriteria.ratingComparison === 'sup'){
      this.bookService.getBooksByRatingSup(rating).subscribe({
        next: (response) => {
          this.books = response; // Stocker les livres dans la variable
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données :', err);
        }   
     });
    }else{
      this.bookService.getBooksByRatingInf(rating).subscribe({
        next: (response) => {
          this.books = response; // Stocker les livres dans la variable
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données :', err);
        } 
     });
    }
  }

  //par année
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

  //par genre
  searchByGenre(genre: string): void {
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getBooksByGenre(encodedGenre).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  //------------------------------méthodes pour les recherche par 2 critères------------------------------------

  // année et genre
  searchByGenreAndYear(genre: string, year: number): void {
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getBooksByGenreAndYear(year, encodedGenre).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  // genre et note
  searchByGenreAndRatingSup( genre: string, rating: number): void {
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getBooksByGenreAndRatingSup(encodedGenre, rating).subscribe({
      next: (response) => {
        this.books = response; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  searchByGenreAndRatingInf( genre: string, rating: number): void {
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getBooksByGenreAndRatingInf(encodedGenre, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  // auteur et année
  searchByAuthorAndYear(author: string, year: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    this.bookService.getBooksByAuthorAndYear(encodedAuthor, year).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  // auteur et note
  searchByAuthorAndRatingSup(author: string, rating: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    this.bookService.getBooksByAuthorAndRatingSup(encodedAuthor, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  searchByAuthorAndRatingInf(author: string, rating: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    this.bookService.getBooksByAuthorAndRatingInf(encodedAuthor, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  // année et note
  searchByYearAndRatingSup(year: number, rating: number): void {
    this.bookService.getBooksByYearAndRatingSup(year, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  searchByYearAndRatingInf(year: number, rating: number): void {
    this.bookService.getBooksByYearAndRatingInf(year, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  //---------------------------méthode pour la recherche par 3 critères--------------------------------------------

  // genre anée et note
  searchByGenreAndYearAndRatingSup(genre: string, year: number, rating: number): void {
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getBooksByGenreAndYearAndRatingSup(encodedGenre, year, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  searchByGenreAndYearAndRatingInf(genre: string, year: number, rating: number): void {
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getBooksByGenreAndYearAndRatingInf(encodedGenre, year, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  // auteur année et note
  searchByAuthorAndYearAndRatingSup(author: string, year: number, rating: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    this.bookService.getBooksByAuthorAndYearAndRatingSup(encodedAuthor, year, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  searchByAuthorAndYearAndRatingInf(author: string, year: number, rating: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    this.bookService.getBooksByAuthorAndYearAndRatingInf(encodedAuthor, year, rating).subscribe({
      next: (response) => {
        this.books = response; // Stocker les livres dans la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  //---------------------------méthode pour la recherche par 4 critères--------------------------------------------

  searchByAuthorAndGenreAndYearAndRatingSup(author: string, genre: string, year: number, rating: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getByAuthorAndGenreAndYearAndRatingSup(encodedAuthor, encodedGenre, year, rating).subscribe({
      next: (response) => {
        this.books = response; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  searchByAuthorAndGenreAndYearAndRatingInf(author: string, genre: string, year: number, rating: number): void {
    const encodedAuthor = encodeURIComponent(author.trim());
    const encodedGenre = encodeURIComponent(genre.trim());
    this.bookService.getByAuthorAndGenreAndYearAndRatingInf(encodedAuthor, encodedGenre, year, rating).subscribe({
      next: (response) => {
        this.books = response; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  //---------------------------------------modifier un livre----------------------------------------------

  editingBookId: number | null = null; // Variable pour suivre l'ID du livre en cours d'édition

  updateBook(id: number): void {
    this.editingBookId = id; // Définir l'ID du livre en cours d'édition
  }

  saveBook(book: Book): void {
    this.bookService.updateBook(book).subscribe({
      next: () => {
        this.ngOnInit(); // Recharger les livres
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du livre :', err);
      }
    });
  }
  cancelEdit(): void {
    this.editingBookId = null; // Annuler l'édition
  }

  //---------------------------------------supprimer un livre----------------------------------------------

  confirmDelete(bookId: number): void {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?');
    if (confirmed) {
      this.deleteBook(bookId);
    }
  }
  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du livre :', err);
      }
    });
  }

  //---------------------------------------naviguer entre les pages----------------------------------------------
  
  navigateToSearchPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/choice/search']);
    });
  }
  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
  navigateToChoicePage() {
    this.router.navigate(['/home/choice']);
  }
}