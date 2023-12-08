import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { PokeApiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private subscription: Subscription;
  private unsubscriber$: Subject<void> = new Subject();

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  public getAllPokemon(): void {
    this.pokeApiService.getPokemonDetails(1)
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe(
      {
        next: (value) => {
          
        },
      }
    )
  }

  ngOnDestroy(): void {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
		if (this.subscription && !this.subscription.closed) {
			this.subscription.unsubscribe();
		}
	}

}
