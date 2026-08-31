// pages/corman-jv/corman-jv.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CormanFooterComponent } from '../corman-footer/corman-footer.component';

@Component({
  selector: 'app-corman-jv',
  standalone: true,
  imports: [CommonModule, CormanFooterComponent],
  templateUrl: './corman-jv.component.html',
  styleUrls: ['./corman-jv.component.scss']
})
export class CormanJvComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  openMail() {
    window.open(
      'https://mail.google.com/mail/?view=cm&to=admin@cormancontractors.com&su=Enquiry%20-%20CorMan%20Contractors',
      '_blank'
    );
  }

  openMap(location: string) {
    const urls: Record<string, string> = {
      edai: 'https://www.google.com/maps/search/?api=1&query=Edai+Town+Central+Province+Papua+New+Guinea',
      moro: 'https://www.google.com/maps/search/?api=1&query=Moro+Southern+Highlands+Papua+New+Guinea',
      lae:  'https://www.google.com/maps/search/?api=1&query=Lae+Morobe+Province+Papua+New+Guinea',
    };
    window.open(urls[location], '_blank');
  }
}