import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CormanFooterComponent } from './corman-footer.component';

describe('CormanFooterComponent', () => {
  let component: CormanFooterComponent;
  let fixture: ComponentFixture<CormanFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CormanFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CormanFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
