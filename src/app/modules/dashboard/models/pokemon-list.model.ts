import { GenericModel } from "./generic.model";

export interface PokemonListApiModel {
  count: number;
  next?: string;
  previous?: string;
  results: GenericModel[];
}
