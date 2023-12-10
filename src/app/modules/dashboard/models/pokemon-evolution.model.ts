import { GenericModel } from "./generic.model";

export interface EvolutionDetail {
  gender: null;
  held_item: null;
  item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: null;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: GenericModel;
  turn_upside_down: boolean;
}

export interface PokemonEvolutionDetailModel {
  evolution_details: EvolutionDetail[];
  evolves_to: PokemonEvolutionDetailModel[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonEvolutionDataModel {
  baby_trigger_item: null;
  chain: PokemonEvolutionDetailModel;
  id: number;
}
