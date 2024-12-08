import { Component } from '@angular/core';
import { ChoicePageComponent } from './components/choice-page/choice-page.component';

@Component({
  selector: 'app-root',
  imports: [ChoicePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-web';
}
