import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search-page',
  imports: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

constructor(private service: ServiceService) {}

getBooks(){
  this.service.getBooks().subscribe((data) => {
    console.log(data);
  });
}
}
