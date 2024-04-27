import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompareCountryComponent} from './compare-country.component';

describe('CompareCountryComponent', () => {
  let component: CompareCountryComponent;
  let fixture: ComponentFixture<CompareCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareCountryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompareCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
