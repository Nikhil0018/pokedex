import { GenericModel } from './generic.model';

export interface PokemonStatsModel {
  base_stat: number;
  effort: number;
  stat: GenericModel;
}
