import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ContactModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coral-seas-mining-service';
}
