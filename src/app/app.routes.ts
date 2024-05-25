import {Routes} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import {CountryComponent} from './country/components/country/country.component';
import {FlagComponent} from './flag/compontents/flag/flag.component';
import {CapitalComponent} from './capital/components/capital/capital.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'country', component: CountryComponent},
  {path: 'flag', component: FlagComponent},
  {path: 'capital', component: CapitalComponent},
  {path: '**', redirectTo: ''}
];
