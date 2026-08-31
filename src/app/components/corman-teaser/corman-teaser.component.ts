import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corman-teaser',
  standalone: true,
  imports: [],
  templateUrl: './corman-teaser.component.html',
  styleUrl: './corman-teaser.component.scss'
})
export class CormanTeaserComponent {
  constructor(private router: Router) {}

  goToCorman(): void {
    this.router.navigate(['/corman-jv']);
  }
}