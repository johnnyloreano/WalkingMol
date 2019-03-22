import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FormComponent } from './menu/form/form.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ProteinViewerComponent } from './interactor/protein-viewer/protein-viewer.component';
import { ManualComponent } from './menu/manual/manual.component';
import { ScatterChartComponent } from "./scatter-chart/scatter-chart.component";

export const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'buscador', component: FormComponent},
  { path: 'manual', pathMatch: 'full', component: ManualComponent},
  { path: 'proteinView', pathMatch: 'full', component: ProteinViewerComponent},
  { path: 'graph', pathMatch: 'full', component: ScatterChartComponent},
  { path: '', redirectTo: 'menu', pathMatch: 'full'}
];

export const AppProviderRoute:  ModuleWithProviders = RouterModule.forRoot(routes);
