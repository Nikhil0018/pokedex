import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PokemonDetailedComponent } from './components/pokemon-detailed/pokemon-detailed.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { 
    path: ':id', 
    component: PokemonDetailedComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
