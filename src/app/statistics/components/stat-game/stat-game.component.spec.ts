import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatGameComponent } from './stat-game.component';

describe('StatGameComponent', () => {
  let component: StatGameComponent;
  let fixture: ComponentFixture<StatGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
