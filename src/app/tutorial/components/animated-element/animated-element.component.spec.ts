import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedElementComponent } from './animated-element.component';

describe('AnimatedElementComponent', () => {
  let component: AnimatedElementComponent;
  let fixture: ComponentFixture<AnimatedElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimatedElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
