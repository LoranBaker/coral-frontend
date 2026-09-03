import { Component, HostListener, signal, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isScrolled    = signal(false);
  activeSection = signal('home');
  isCormanPage  = signal(false);
  menuOpen      = signal(false);        // ← added

  private readonly sections = ['home', 'about', 'services', 'gallery', 'contact'];
  private observer?: IntersectionObserver;
  @Output() getInTouch = new EventEmitter<void>();
  constructor(private router: Router) {}

  ngOnInit() {
    this.activeSection.set('home');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        const isCorman = url === '/corman-jv';
        this.isCormanPage.set(isCorman);
        this.activeSection.set(isCorman ? 'corman' : 'home');
        this.closeMenu();              // ← close menu on route change
      }
    });
    this.syncRouteState();
    this.setupObserver();
    this.updateScrollState();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateScrollState();
    if (this.menuOpen()) this.closeMenu(); // ← close menu on scroll
  }

  // ── menu helpers ──────────────────────────────────────────
  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
  // ─────────────────────────────────────────────────────────

  private setupObserver() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const elements = this.sections
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    this.observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        this.activeSection.set(visible[0].target.id);
      }
    }, {
      root: null,
      threshold: [0.2, 0.4, 0.6, 0.8],
      rootMargin: '-15% 0px -30% 0px'
    });

    elements.forEach(el => this.observer?.observe(el));
  }

  private syncRouteState() {
    const url = this.router.url;
    const isCorman = url === '/corman-jv';
    this.isCormanPage.set(isCorman);
    this.activeSection.set(isCorman ? 'corman' : 'home');
  }

  private updateScrollState() {
    if (typeof window === 'undefined') return;
    if (this.isCormanPage()) return;
    this.isScrolled.set(window.scrollY > 80);

    if (window.scrollY <= 80) {
      this.activeSection.set('home');
      return;
    }

    const docHeight = document.documentElement.scrollHeight;
    if (window.scrollY + window.innerHeight >= docHeight - 20) {
      this.activeSection.set('contact');
    }
  }

  scrollTo(sectionId: string) {
    if (typeof document === 'undefined') return;

    const el = document.getElementById(sectionId);
    if (!el) return;

    this.activeSection.set(sectionId);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      this.activeSection.set(sectionId);
    }, 250);
  }

  navigateToSection(sectionId: string) {
    const currentPath = this.router.url;

    if (currentPath !== '/' && currentPath !== '') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollTo(sectionId), 100);
      });
      return;
    }

    this.scrollTo(sectionId);
  }

  goToCorman() {
    this.isCormanPage.set(true);
    this.activeSection.set('corman');
    this.router.navigate(['/corman-jv']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}