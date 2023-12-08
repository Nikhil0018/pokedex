import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiUrl } from 'src/app/services/base-api-url.service';
import { PokemonListApiModel } from '../models/pokemon-list.model';
import { PokemonDetailModel } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(
    private http: HttpClient
  ) { }
  
	public getAllPokemon(): Observable<PokemonListApiModel[]> {
		return this.http.get<PokemonListApiModel[]>(`${BaseApiUrl.POKE_API}pokemon`);
	}

  public getPokemonDetails(pokemonId: number): Observable<PokemonDetailModel> {
		return this.http.get<PokemonDetailModel>(`${BaseApiUrl.POKE_API}pokemon/${pokemonId}`);
	}

}
