import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  activeTab = 'who';

  whoImages = [
    { src: '/assets/10.jpg', alt: 'Coral Seas Mining Services drilling operations' },
    { src: '/assets/companyimg/13..jpeg', alt: 'Coral Seas Mining Services field operations' },
    { src: '/assets/companyimg/12..JPG', alt: 'Coral Seas Mining Services project site' }
  ];
  safetyImages = [
    { src: '/assets/companyimg/27..JPG', alt: 'Coral Seas Mining Services safety operations' },
    { src: '/assets/companyimg/26..JPG', alt: 'Coral Seas Mining Services site team' },
    { src: '/assets/companyimg/13..jpeg', alt: 'Coral Seas Mining Services worksite' }
  ];
  communityImages = [
    { src: '/assets/companyimg/20..JPG', alt: 'Coral Seas Mining Services community partnership' },
    { src: '/assets/companyimg/15..jpeg', alt: 'Coral Seas Mining Services local partnership' },
    { src: '/assets/companyimg/21..jpg', alt: 'Coral Seas Mining Services community engagement' }
  ];
  whoImageIndex = 0;
  safetyImageIndex = 0;
  communityImageIndex = 0;

  private readonly MAPBOX_TOKEN = 'pk.eyJ1Ijoicm9vb290MjMiLCJhIjoiY210Zzl3MDYwMXMxcTJ5c2Vkczg1d3c3eCJ9.V2o_YIT10SrXIsst5n2AqA';
  private readonly MAPBOX_STYLE = 'roooot23/cmj9wd1v9004n01s9401589mt';

  locations: Array<{
    role: string;
    name: string;
    sub: string;
    mapUrl: SafeResourceUrl;
  }>;

  constructor(private sanitizer: DomSanitizer) {
    const rawLocations = [
  { role: 'Head Office',    name: 'Port Moresby', sub: 'NCDC',                                      lng: 147.1803, lat: -9.4438, zoom: 10 },
  { role: 'Operations Hub', name: 'Lae',          sub: 'Operations & Maintenance · Morobe Province', lng: 146.9922, lat: -6.7248, zoom: 10 },
  { role: 'Regional Base',  name: 'Moro',         sub: 'Regional Operations · Southern Highlands',   lng: 143.2333, lat: -6.3667, zoom: 9  },
];

    this.locations = rawLocations.map(loc => ({
  ...loc,
  mapUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://api.mapbox.com/styles/v1/${this.MAPBOX_STYLE}.html?title=false&access_token=${this.MAPBOX_TOKEN}&zoomwheel=false&zoompan=false&search=false&attribution=false#${loc.zoom}/${loc.lat}/${loc.lng}`
  )
}));
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  previousImage(section: 'who' | 'safety' | 'community') {
    const images = this.getImages(section);
    this.setImageIndex(section, this.getImageIndex(section) === 0 ? images.length - 1 : this.getImageIndex(section) - 1);
  }

  nextImage(section: 'who' | 'safety' | 'community') {
    const images = this.getImages(section);
    this.setImageIndex(section, (this.getImageIndex(section) + 1) % images.length);
  }

  selectImage(section: 'who' | 'safety' | 'community', index: number) {
    this.setImageIndex(section, index);
  }

  private getImages(section: 'who' | 'safety' | 'community') {
    return section === 'who' ? this.whoImages : section === 'safety' ? this.safetyImages : this.communityImages;
  }

  private getImageIndex(section: 'who' | 'safety' | 'community') {
    return section === 'who' ? this.whoImageIndex : section === 'safety' ? this.safetyImageIndex : this.communityImageIndex;
  }

  private setImageIndex(section: 'who' | 'safety' | 'community', index: number) {
    if (section === 'who') this.whoImageIndex = index;
    if (section === 'safety') this.safetyImageIndex = index;
    if (section === 'community') this.communityImageIndex = index;
  }
}