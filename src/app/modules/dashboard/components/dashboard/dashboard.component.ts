import { Component, HostListener, OnInit } from '@angular/core';
import {
  Subject,
  Subscription,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  takeUntil,
} from 'rxjs';
import { PokeApiService } from '../../services/pokeapi.service';
import { HttpParams } from '@angular/common/http';
import { PokemonDetailModel } from '../../models/pokemon.model';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public pokemonCount: number = 0;
  public totalPages: number = 0;
  public skeletonArray: number[] = Array.from(
    { length: 31 },
    (_, index) => index
  );
  public pageSizeOptions: number[] = [30, 100];
  public pageSize: number = this.pageSizeOptions[0];
  public pokemonOffset: number = 0;
  public pageNumber: number = 0;
  public screenWidth: number = 700;
  public loading: boolean = false;
  public pokemonList: PokemonDetailModel[] = [];
  public searchControl: FormControl<string>;
  public greenTypePokemon: string[] = ['grass', 'ground'];
  private subscription: Subscription;
  private unsubscriber$: Subject<void> = new Subject();

  constructor(
    private pokeApiService: PokeApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.initFormAndListeners();
    this.getAllPokemon();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  public initFormAndListeners(): void {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((val) => {
        if (val && val?.trim() != '') {
          this.getPokemonByName();
        } else {
          this.getAllPokemon();
        }
      });
  }

  public backPage(): void {
    --this.pageNumber;
    this.getAllPokemon();
  }

  public nextPage(): void {
    ++this.pageNumber;
    this.getAllPokemon();
  }

  public onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllPokemon();
  }

  public getPokemonByName(): void {
    this.loading = true;
    this.pokemonList = [];
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.pokeApiService
      .getPokemonByName(this.searchControl.value.toLowerCase())
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (res) => {
          this.handlePokemonDetailResponse(res);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  public getAllPokemon(): void {
    this.loading = true;
    let queryParams = this.getQueryParams();
    
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    
    this.subscription = this.pokeApiService
      .getAllPokemon(queryParams)
      .pipe(
        concatMap((res) => {
          this.pokemonCount = res.count;
          this.totalPages = this.pokemonCount / this.pageSize;
          return forkJoin(
            res.results.map((x) =>
              this.pokeApiService.getPokemonDetailByUrl(x.url)
            )
          );
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe({
        next: (res) => {
          this.handlePokemonListResponse(res);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  public handlePokemonListResponse(res: PokemonDetailModel[]): void {
    this.pokemonList = res.map((pokemon) => {
      return {
        id: pokemon.id,
        abilities: pokemon.abilities,
        base_experience: pokemon.base_experience,
        height: pokemon.height,
        weight: pokemon.weight,
        is_default: pokemon.is_default,
        location_area_encounters: pokemon.location_area_encounters,
        name: pokemon.name,
        order: pokemon.order,
        species: pokemon.species,
        sprites: pokemon.sprites,
        stats: pokemon.stats,
        types: pokemon.types,
        moves: pokemon.moves,
      };
    });
  }

  public handlePokemonDetailResponse(poke: PokemonDetailModel): void {
    this.pokemonList.push({
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
    });
  }

  public getQueryParams(): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('limit', this.pageSize);
    httpParams = httpParams.append('offset', this.pageSize * this.pageNumber);
    return httpParams;
  }

  public openPokemon(pokemon: PokemonDetailModel): void {
    this.router.navigate(['/', pokemon.id]);
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
