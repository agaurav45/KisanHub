import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ChartDataService } from '../services/chart.data.service';

@Component({
	selector: 'chart-data',
	templateUrl: './chart.data.component.html',
	styleUrls: ['./chart.data.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ChartDataComponent {
	showLoading:boolean = false;
	selectedLocation:string = '';
	Locations = ['UK', 'England', 'Scotland', 'Wales'];
	selectedMetric:string = '';	
	Metrics = ['Tmax', 'Tmin', 'Rainfall'];
	chartData:any;
	mapMonth
	monthMap: any = {
        '1': 'January', '2': 'Feburary', '3': 'March', '4': 'April', '5': 'May', '6':'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12':'December'
    };
	
	constructor(public _chartService: ChartDataService) {
		
	}

	ngOnInit() {
		
	}
	
	getChart() {
		this.showLoading = true;
		this._chartService.getChartData(this.selectedMetric, this.selectedLocation, (result) => {
			this.chartData = result;
			this.showLoading = false;
			console.log(result);
        });
	}
  
}
