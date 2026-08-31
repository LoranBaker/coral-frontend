import { Component, HostListener, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  private readonly platformId = inject(PLATFORM_ID);
  scrollY = signal(0);

  heroBgParallax = computed(() =>
    `translateY(${this.scrollY() * 0.3}px)`
  );

  heroContentOpacity = computed(() => {
    if (!isPlatformBrowser(this.platformId)) {
      return 1;
    }

    return Math.max(0, 1 - this.scrollY() / (window.innerHeight * 0.55));
  });

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollY.set(window.scrollY);
  }

  scrollToContact() {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}