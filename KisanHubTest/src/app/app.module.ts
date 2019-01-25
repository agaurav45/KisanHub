import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { ChartDataComponent } from './components/chart.data.component';
import { ChartDataService } from './services/chart.data.service';


@NgModule({
  declarations: [
    AppComponent, ChartDataComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ChartsModule, AppRoutingModule
  ],
  providers: [ChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
