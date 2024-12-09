import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
data: any = []; // Variable pour stocker les données
constructor(private bookService: BookService) {}

ngOnInit(): void {
  // Appeler le service pour obtenir les données
  this.bookService.getBooks().subscribe({
    next: (response) => {
      this.data = response; // Met à jour la variable avec les données reçues
      console.log(this.data); // Vérifiez les données dans la console
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des données :', err);
    }
  });
}
}
