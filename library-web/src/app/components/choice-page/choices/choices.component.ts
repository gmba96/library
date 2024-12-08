import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-choices',
  imports: [],
  templateUrl: './choices.component.html',
  styleUrl: './choices.component.css'
})
export class ChoicesComponent {
  @Input() imgSrc!: string;
  @Input() title!: string;
  @Input() description!: string;
}
