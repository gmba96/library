import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  books: any[] = [];
  errorMessage: string = '';

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.service.getBooks().subscribe(
      (data) => {
        this.books = data;
        console.log('Books:', this.books);
      },
      (error) => {
        this.errorMessage = 'Error fetching books: ' + error.message;
        console.error('Error fetching books:', error);
      }
    );
  }
}