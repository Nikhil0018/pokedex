import { GenericModel } from "./generic.model";
import { PokemonAbilityModel } from "./pokemon-ability.model";
import { PokemonMoveModel } from "./pokemon-moves.model";
import { PokemonSpriteModel } from "./pokemon-sprite.model";
import { PokemonStatsModel } from "./pokemon-stats.model";
import { PokemonTypeModel } from "./pokemon-type.model";

export interface PokemonDetailModel {
  abilities: PokemonAbilityModel[];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: GenericModel;
  sprites: PokemonSpriteModel;
  stats: PokemonStatsModel[];
  types: PokemonTypeModel[];
  moves: PokemonMoveModel[];
  weight: number;
}