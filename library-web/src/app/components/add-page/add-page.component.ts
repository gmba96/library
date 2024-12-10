import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-page',
  imports: [FormsModule],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.css'
})
export class AddPageComponent {
  book: Book = new Book();

  constructor(private bookService: BookService) {}
  
  addBook(book: any) {
    this.bookService.addBook(book);
  }
  
}
