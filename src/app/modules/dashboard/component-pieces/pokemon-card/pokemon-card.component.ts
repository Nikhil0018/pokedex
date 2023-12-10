import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonDetailModel } from '../../models/pokemon.model';
import { blueTypePokemonList, redTypePokemonList, greyTypePokemonList, darkTypePokemonList, yellowTypePokemonList } from '../../../../core/constants';

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

  public getCardStyle(): any {
    
    if(!this.pokemon?.types?.length){
      return {};
    }

    const type = this.pokemon?.types[0].type.name;
    if(blueTypePokemonList.includes(type)){
      return {
        'background-color': '#58ABF6'
      };
    }

    if(redTypePokemonList.includes(type)){
      return {
        'background-color': '#F7786B'
      };
    }
    
    if(yellowTypePokemonList.includes(type)){
      return {
        'background-color': '#FFCE4B'
      };
    }

    if(greyTypePokemonList.includes(type)){
      return {
        'background-color': '#C0C0C0'
      };
    }

    if(darkTypePokemonList.includes(type)){
      return {
        'background-color': '#7E57C2'
      };
    }
  }

}
