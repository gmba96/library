import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) {}

  // rediriger vers la page des choix
  navigateToChoicePage() {
    console.log('Navigating to choice page');
    this.router.navigate(['/home/choice']);
  }
}

