import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service'; // Adapte le chemin si nécessaire
import { Book } from '../../models/book.model'; // Adapte le chemin si nécessaire
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';

@Component({
  selector: 'app-visualisation-page',
  templateUrl: './visualisation-page.component.html',
  styleUrls: ['./visualisation-page.component.css']
})
export class VisualisationPageComponent implements OnInit {
  books: Book[] = [];
  genre: string[] = [];
  years: number[] = []
  yearCount: number[] = [];
  genreCount: number[] = [];
  colors: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Brown', 'Grey', 'Black'];
  genreChart: any;
  yearChart: any;

  constructor(private bookService: BookService) { }

  public config: any = {
    labels: this.genre, // Genres comme labels
    datasets: [{
      label: 'Genres',
      data: this.genreCount, // Nombre de livres par genre
      backgroundColor: this.colors,
      hoverOffset: 4
    }]
  };

  public barConfig: any = {
    labels: this.years,  // Années comme labels
    datasets: [{
      label: 'Books per Year',
      data: this.yearCount, // Nombre de livres par année
      backgroundColor: this.colors,
      hoverOffset: 4
    }],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  ngOnInit(): void {
    this.getBooks();

    // Register chart.js components
    Chart.register(...registerables);
  }

  // recupérer les livres
  getBooks(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.genreData();
      this.yearData();  
    });
  }

  // ------------------------------ création du graphique par genre ------------------------------
  genreData(): void {
    // extraire les genres
    this.genre = [...new Set(this.books.map(book => book.genre))];

    // compter le nombre de livres par genre
    this.genreCount = this.genre.map(g => this.books.filter(book => book.genre === g).length);

    // labels sont les genrs et data sont les nombres de livres par genre
    this.config.labels = this.genre;
    this.config.datasets[0].data = this.genreCount;

    if (this.genreChart) {
      this.genreChart.destroy();
    }

    this.genreChart = new Chart('genreChart', {
      type: 'pie', 
      data: this.config
    });
  }

  // ------------------------------ création du graphique par année ------------------------------
  yearData(): void {
    this.years = [...new Set(this.books.map(book => book.year))];
  
    this.yearCount = this.years.map(y => this.books.filter(book => book.year === y).length);
    console.log(this.yearCount);
    this.barConfig.labels = this.years;
    this.barConfig.datasets[0].data = this.yearCount;

    if (this.yearChart) {
      this.yearChart.destroy();
    }
  
    this.yearChart = new Chart('yearChart', {
      type: 'bar',
      data: this.barConfig,
      options: this.barConfig.options
    });
  }
}