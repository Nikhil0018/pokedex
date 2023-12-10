import { Component, OnInit } from '@angular/core';
import { PokemonDetailModel } from '../../models/pokemon.model';
import { PokemonSpeciesDataModel } from '../../models/pokemon-species.mode';
import { PokeApiService } from '../../services/pokeapi.service';
import { Subject, concatMap, of, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonEvolutionDataModel } from '../../models/pokemon-evolution.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detailed',
  templateUrl: './pokemon-detailed.component.html',
  styleUrls: ['./pokemon-detailed.component.scss'],
})
export class PokemonDetailedComponent implements OnInit {
  public pokemonId: number = 0;
  public pokemon: PokemonDetailModel;
  public pokemonSpeciesData: PokemonSpeciesDataModel;
  public pokemonEvolutionData: PokemonEvolutionDataModel;
  public pokemonEvolutionChain: any[];
  public pokemonImage: string;
  public loadingBasic: boolean = false;
  public loadingEvolution: boolean = false;
  public loadingSpecies: boolean = false;
  private unsubscriber$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private pokeApiService: PokeApiService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pokemonId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getPokemonById();
    this.getSpeciesData();
  }

  public getPokemonById(): void {
    this.loadingBasic = true;
    this.pokeApiService
      .getPokemonDetailById(this.pokemonId)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (res) => {
          this.handlePokemonDetailResponse(res);
          this.loadingBasic = false;
        },
        error: (err) => {
          this.loadingBasic = false;
        },
      });
  }

  public handlePokemonDetailResponse(poke: PokemonDetailModel): void {
    this.pokemon = {
      id: poke.id,
      abilities: poke.abilities,
      base_experience: poke.base_experience,
      height: poke.height,
      weight: poke.weight,
      is_default: poke.is_default,
      location_area_encounters: poke.location_area_encounters,
      name: poke.name,
      order: poke.order,
      species: poke.species,
      sprites: poke.sprites,
      stats: poke.stats,
      types: poke.types,
      moves: poke.moves,
    };
    this.pokemonImage = this.pokemon.sprites.front_default;
  }

  public toggleImage(): void {
    if (this.pokemonImage == this.pokemon.sprites.front_default) {
      this.pokemonImage = this.pokemon.sprites.back_default;
      return;
    }
    this.pokemonImage = this.pokemon.sprites.front_default;
  }

  public getSpeciesData(): void {
    this.loadingSpecies = true;
    this.loadingEvolution = true;
    this.pokeApiService
      .getPokemonSpeciesDetailById(this.pokemonId)
      .pipe(
        concatMap((response) => {
          this.handlePokemonSpeciesResponse(response);
          this.loadingSpecies = false;
          if (this.pokemonSpeciesData?.evolution_chain?.url) {
            return this.pokeApiService.getPokemonEvolutionDetailByUrl(
              this.pokemonSpeciesData.evolution_chain.url
            );
          } else {
            return of(null);
          }
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.handlePokemonEvolutionResponse(res);
          }
          this.loadingEvolution = false;
        },
        error: (err) => {
          this.loadingSpecies = false;
          this.loadingEvolution = false;
        },
      });
  }

  public handlePokemonSpeciesResponse(poke: PokemonSpeciesDataModel): void {
    this.pokemonSpeciesData = {
      evolution_chain: poke.evolution_chain,
      flavor_text_entries: poke.flavor_text_entries,
      habitat: poke.habitat,
    };
  }

  public handlePokemonEvolutionResponse(poke: PokemonEvolutionDataModel): void {
    this.pokemonEvolutionData = {
      chain: poke.chain,
      baby_trigger_item: poke.baby_trigger_item,
      id: poke.id,
    };
  }

  public getjson(object: any): string {
    return JSON.stringify(object);
  }

  public gotoProfile(url: string): void {
    let ids = url.split('/');
    let idFromUrl = ids[ids.length-2];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/', idFromUrl]);
  }

  public getImageUrl(url: string): string {
    let ids = url.split('/');
    let idFromUrl = ids[ids.length-2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl}.png`;
  }

  public goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
