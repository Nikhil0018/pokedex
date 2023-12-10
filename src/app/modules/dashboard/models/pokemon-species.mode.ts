import { GenericModel } from "./generic.model";

export interface PokemonSpeciesDataModel{
    evolution_chain?: {url?: string};
    habitat?: GenericModel;
    flavor_text_entries?: FlavorTextModel[];
}

export interface FlavorTextModel{
    flavor_text: string;
}