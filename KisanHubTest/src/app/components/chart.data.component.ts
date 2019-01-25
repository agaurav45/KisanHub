import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ChartDataService } from '../services/chart.data.service';

@Component({
	selector: 'chart-data',
	templateUrl: './chart.data.component.html',
	styleUrls: ['./chart.data.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ChartDataComponent {
	public showLoading:boolean = false;
	public selectedLocation:string = '';
	public Locations = ['UK', 'England', 'Scotland', 'Wales'];
	public selectedMetric:string = '';	
	public Metrics = ['Tmax', 'Tmin', 'Rainfall'];
	public monthMap: any = {'1': 'January', '2': 'Feburary', '3': 'March', '4': 'April', '5': 'May', '6':'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12':'December'};
	public chartData:any =[];
	public yearIndex: {start: 0, end: 107}
	public lineChartType:string = 'line';
	public lineChartData:any = [];
	public lineChartLabels:any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	public lineChartOptions:any = { responsive: true };
	public lineChartLegend:boolean = true;
	
	
	constructor(public _chartService: ChartDataService) { }

	ngOnInit() {
		
	}
	
	getChart() {
		this.showLoading = true;
		this._chartService.getChartData(this.selectedMetric, this.selectedLocation, (result) => {
			this.chartData = result;
			this.showLoading = false;
			this.getLineChartData(this.chartData);
        });
	}
	
	getLineChartData(data) {
		let temp = data.slice(0);
		let arr =[];
		while (temp.length > 0) {
			arr.push(temp.splice(0, 12));
		}
		arr.forEach((ele1, index1) => {			
			if(index1 < 10) {
				let data = [];
				ele1.forEach((ele2)=> {
					data.push(ele2.value);	
				});
				this.lineChartData.push({data:data, label: ele1[0].year})
			}
		});
	}
	
	randomizeType() {
		this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
	}
 
	chartClicked(e:any) {
		console.log(e);
	}
 
	chartHovered(e:any) {
		console.log(e);
	}
	
	previous() {
	
	}
	
	next() {
	
	}
}
