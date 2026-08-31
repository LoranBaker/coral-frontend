import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CormanJvComponent } from './corman-jv.component';

describe('CormanJvComponent', () => {
  let component: CormanJvComponent;
  let fixture: ComponentFixture<CormanJvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CormanJvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CormanJvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
