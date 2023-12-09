import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailedDialogComponent } from './pokemon-detailed-dialog.component';

describe('PokemonDetailedDialogComponent', () => {
  let component: PokemonDetailedDialogComponent;
  let fixture: ComponentFixture<PokemonDetailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
