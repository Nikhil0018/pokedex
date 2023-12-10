import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailedComponent } from './pokemon-detailed.component';

describe('PokemonDetailedComponent', () => {
  let component: PokemonDetailedComponent;
  let fixture: ComponentFixture<PokemonDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
