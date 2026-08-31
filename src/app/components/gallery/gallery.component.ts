import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GallerySlide {
  title: string;
  sub: string;
  icon: string;
  bgColor: string;       // ← placeholder gradient until real photos added
  // src: string;        // ← uncomment and use for real assets
  categories: string[];
  isVideo: boolean;
  location?: string;
  tags: { label: string; type: 'default' | 'blue' | 'orange' }[];
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  filter = signal<string>('all');
  currentIndex = signal<number>(0);

  allSlides: GallerySlide[] = [
    {
  title: 'Controlled Blast — Kutmor Access Road',
  sub: '84,000 m³ drill & blast for 1.4 km road — SANTOS, Southern Highlands',
  icon: '🌋',
  bgColor: 'linear-gradient(135deg, #071808 0%, #2d5a2d 60%, #1a4a2a 100%)',
  categories: ['blast', 'video'],
  isVideo: true,
  location: 'Southern Highlands, PNG',  // ← optional per slide
  tags: [
    { label: 'Blasting', type: 'orange' },
    { label: 'SANTOS',   type: 'blue' },
    { label: '2023',     type: 'default' },
  ]
},
    {
  title: 'Site Crew — Muruk Well Pad',
  sub: 'FIFO operations at 2,500 m above sea level — Oil Search, PNG Highlands',
  icon: '👷',
  bgColor: 'linear-gradient(135deg, #0d1a2e 0%, #1a3a6e 60%, #003366 100%)',
  categories: ['ops'],
  isVideo: false,
  location: 'Muruk, PNG Highlands',
  tags: [
    { label: 'Operations', type: 'default' },
    { label: 'Oil Search', type: 'blue' },
    { label: '2,500 m ASL', type: 'default' },
  ]
},
    {
      title: 'Heavy Equipment — Kutubu Quarry',
      sub: 'Dozer and excavator operations — quarry extraction, Southern Highlands',
      icon: '🚜',
      bgColor: 'linear-gradient(135deg, #1a1a0d 0%, #3a3a1a 60%, #2e2e0d 100%)',
      categories: ['ops'],
      isVideo: false,
      tags: [
        { label: 'Earthworks', type: 'default' },
        { label: 'Quarrying',  type: 'default' },
      ]
    },
    {
      title: 'Blast Sequence — Santos Moran 6',
      sub: 'Drill pad restoration works — controlled blasting around existing infrastructure',
      icon: '💥',
      bgColor: 'linear-gradient(135deg, #1a0d0d 0%, #4a1a1a 60%, #3a1010 100%)',
      categories: ['blast', 'video'],
      isVideo: true,
      tags: [
        { label: 'Blasting', type: 'orange' },
        { label: 'SANTOS',   type: 'blue' },
        { label: '2023',     type: 'default' },
      ]
    },
    {
      title: 'Road Construction — Kutubu Access Road',
      sub: 'Civil construction and bridge repair works — Spiecapag Niugini',
      icon: '🏗️',
      bgColor: 'linear-gradient(135deg, #0d1a1a 0%, #1a3a3a 60%, #0d2e2e 100%)',
      categories: ['ops'],
      isVideo: false,
      tags: [
        { label: 'Civil', type: 'default' },
        { label: 'Roads', type: 'default' },
      ]
    },
    {
      title: 'Drill Rig — Yasale Quarry',
      sub: 'Drilling and blasting for Yasale Quarry, Erave to Samberigi Road — Oil Search',
      icon: '⛏️',
      bgColor: 'linear-gradient(135deg, #1a0d1a 0%, #3a1a3a 60%, #2e0d2e 100%)',
      categories: ['blast', 'video'],
      isVideo: true,
      tags: [
        { label: 'Blasting',   type: 'orange' },
        { label: 'Oil Search', type: 'blue' },
        { label: '2015–16',    type: 'default' },
      ]
    },
  ];

  filteredSlides = computed(() => {
    const f = this.filter();
    if (f === 'all')   return this.allSlides;
    if (f === 'video') return this.allSlides.filter(s => s.isVideo);
    return this.allSlides.filter(s => s.categories.includes(f));
  });

  total        = computed(() => this.filteredSlides().length);
  trackOffset  = computed(() => `translateX(-${this.currentIndex() * 100}%)`);
  isPrev       = computed(() => this.currentIndex() === 0);
  isNext       = computed(() => this.currentIndex() === this.total() - 1);

  setFilter(value: string): void {
    this.filter.set(value);
    this.currentIndex.set(0);
  }

  goTo(index: number): void {
    this.currentIndex.set(Math.max(0, Math.min(index, this.total() - 1)));
  }

  prev(): void { this.goTo(this.currentIndex() - 1); }
  next(): void { this.goTo(this.currentIndex() + 1); }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft')  this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  private touchStartX = 0;
  onTouchStart(e: TouchEvent): void { this.touchStartX = e.touches[0].clientX; }
  onTouchEnd(e: TouchEvent): void {
    const diff = this.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
  }

  getTagClass(type: string): string {
  const base = 'gslide__tag';
  if (type === 'copper' || type === 'orange') return `${base} ${base}--copper`;
  if (type === 'blue') return `${base} ${base}--blue`;
  return base;
}
}