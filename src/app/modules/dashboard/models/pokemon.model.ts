import { GenericModel } from "./generic.model";
import { PokemonAbilityModel } from "./pokemon-ability.model";
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
  sprites: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: any;
  };
  stats: PokemonStatsModel[];
  types: PokemonTypeModel[];
  weight: number;
}
