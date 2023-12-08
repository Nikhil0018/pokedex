import { FlagsModel } from "./flags.model";
import { PokeApiUrlModel } from "./pokeapiurl.model";

export interface EnvironmentModel{
    flags: FlagsModel;

	pokeapi: PokeApiUrlModel;
}