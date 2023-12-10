import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonDetailModel } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() public pokemon: PokemonDetailModel;
  @Output() public clickEvent: EventEmitter<PokemonDetailModel> = new EventEmitter<PokemonDetailModel>();

  constructor() { }

  ngOnInit(): void {
  }

  public openPokemon(): void {
    this.clickEvent.emit(this.pokemon);
  }

}
