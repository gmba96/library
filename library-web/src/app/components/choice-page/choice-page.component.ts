import { Component } from '@angular/core';
import { ChoicesComponent } from './choices/choices.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-page',
  imports: [ChoicesComponent],
  templateUrl: './choice-page.component.html',
  styleUrls: ['./choice-page.component.css'] // Correction ici
})
export class ChoicePageComponent {
  constructor(private router: Router) {}
  
  navigateToSearchPage() {
    console.log('Navigating to search page');
    this.router.navigate(['/home/choice/search']);
  }
  navigateToAddPage() {
    console.log('Navigating to add page');
    this.router.navigate(['/home/choice/add']);
  }
  navigateToVisualisationPage() {
    console.log('Navigating to visualisation page');
    this.router.navigate(['/home/choice/visualize']);
  }
}
