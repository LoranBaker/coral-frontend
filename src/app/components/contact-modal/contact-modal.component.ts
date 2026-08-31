import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name:    string;
  company: string;
  email:   string;
  message: string;
}

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrls:  ['./contact-modal.component.scss']
})
export class ContactModalComponent {

  isOpen      = signal(false);
  isSubmitting = signal(false);
  submitted   = signal(false);

  form: ContactForm = { name: '', company: '', email: '', message: '' };

  open()  { this.isOpen.set(true);  document.body.style.overflow = 'hidden'; }
  close() {
    this.isOpen.set(false);
    document.body.style.overflow = '';
    // reset after transition finishes
    setTimeout(() => {
      this.submitted.set(false);
      this.isSubmitting.set(false);
      this.form = { name: '', company: '', email: '', message: '' };
    }, 300);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() { if (this.isOpen()) this.close(); }

  async onSubmit() {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);

    // Replace this block with your real API call
    await new Promise(resolve => setTimeout(resolve, 1400));

    this.isSubmitting.set(false);
    this.submitted.set(true);
  }
}