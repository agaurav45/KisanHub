import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ChartDataComponent } from './components/chart.data.component';

const routes: Routes = [
  { path: 'chart', component: ChartDataComponent },
  { path: '**', redirectTo: '/chart' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}
