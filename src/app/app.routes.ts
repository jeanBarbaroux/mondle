import {Routes} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import {CountryComponent} from './country/components/country/country.component';
import {FlagComponent} from './flag/compontents/flag/flag.component';
import {StatisticsComponent} from "./statistics/components/statistics/statistics.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'country', component: CountryComponent},
  {path: 'flag', component: FlagComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: '**', redirectTo: ''}
];
