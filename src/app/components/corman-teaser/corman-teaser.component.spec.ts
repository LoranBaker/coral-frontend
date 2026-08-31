import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CormanTeaserComponent } from './corman-teaser.component';

describe('CormanTeaserComponent', () => {
  let component: CormanTeaserComponent;
  let fixture: ComponentFixture<CormanTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CormanTeaserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CormanTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
