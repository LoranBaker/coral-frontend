import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corman-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corman-footer.component.html',
  styleUrls: ['./corman-footer.component.scss']
})
export class CormanFooterComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openMail(): void {
    window.open(
      'https://mail.google.com/mail/?view=cm&to=admin@cormancontractors.com&su=Enquiry%20-%20CorMan%20Contractors',
      '_blank'
    );
  }

  openMap(location: string): void {
    const urls: Record<string, string> = {
      edai: 'https://www.google.com/maps/search/?api=1&query=Edai+Town+Central+Province+Papua+New+Guinea',
      moro: 'https://www.google.com/maps/search/?api=1&query=Moro+Southern+Highlands+Papua+New+Guinea',
      lae:  'https://www.google.com/maps/search/?api=1&query=Lae+Morobe+Province+Papua+New+Guinea',
    };
    window.open(urls[location], '_blank');
  }
}