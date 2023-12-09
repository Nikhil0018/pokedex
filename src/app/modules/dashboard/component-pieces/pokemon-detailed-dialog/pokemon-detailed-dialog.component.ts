import { Component, Inject, OnInit } from '@angular/core';
import { PokemonDetailModel } from '../../models/pokemon.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-detailed-dialog',
  templateUrl: './pokemon-detailed-dialog.component.html',
  styleUrls: ['./pokemon-detailed-dialog.component.scss']
})
export class PokemonDetailedDialogComponent implements OnInit {

  public pokemon: PokemonDetailModel;
  public pokemonImage: string;

  constructor(
    private dialogRef: MatDialogRef<PokemonDetailedDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pokemon = data.pokemon;
   }

  ngOnInit(): void {
    this.pokemonImage = this.pokemon.sprites.front_default;
  }

  public toggleImage(): void {
    if(this.pokemonImage == this.pokemon.sprites.front_default) {
      this.pokemonImage = this.pokemon.sprites.back_default;
      return;
    }
    this.pokemonImage = this.pokemon.sprites.front_default;
  }

}
