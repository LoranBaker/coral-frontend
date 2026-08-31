import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ServicesComponent } from '../../components/services/services.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CormanTeaserComponent } from '../corman-teaser/corman-teaser.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ServicesComponent, GalleryComponent, CormanTeaserComponent, FooterComponent],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-services></app-services>
    <app-gallery></app-gallery>
    <app-corman-teaser></app-corman-teaser>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}