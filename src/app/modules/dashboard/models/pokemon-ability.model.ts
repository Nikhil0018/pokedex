import { GenericModel } from './generic.model';

export interface PokemonAbilityModel {
  ability: GenericModel;
  is_hidden: boolean;
  slot: number;
}
