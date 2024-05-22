import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GuessedCountryComponent} from './guessed-country.component';

describe('GuessedCountryComponent', () => {
  let component: GuessedCountryComponent;
  let fixture: ComponentFixture<GuessedCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessedCountryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GuessedCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
