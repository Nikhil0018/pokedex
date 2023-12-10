import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PokemonCardComponent } from './component-pieces/pokemon-card/pokemon-card.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonDetailedComponent } from './components/pokemon-detailed/pokemon-detailed.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PokemonCardComponent,
    PokemonDetailedComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
