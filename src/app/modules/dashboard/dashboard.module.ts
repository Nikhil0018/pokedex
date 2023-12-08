import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PokemonCardComponent } from './component-pieces/pokemon-card/pokemon-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
