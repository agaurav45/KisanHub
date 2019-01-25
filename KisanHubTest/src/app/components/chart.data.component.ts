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
	public initialChartData: any = [];
	public chartData:any =[];
	public yearIndex:number = 107;
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
			this.initialChartData = result;
			let temp = this.initialChartData.slice(0);
			while (temp.length > 0) {
				this.chartData.push(temp.splice(0, 12));
			}
			this.getLineChartData(this.chartData);
        });
	}
	
	getLineChartData(chartData) {
		this.lineChartData = [];
		let start = this.yearIndex-10;
		let end = this.yearIndex;
		chartData.forEach((ele1, index1) => {			
			if(index1> start && index1 <= end) {
				let data = [];
				ele1.forEach((ele2)=> {
					data.push(ele2.value);	
				});
				this.lineChartData.push({data:data, label: ele1[0].year})
			}
		});
		this.showLoading = false;
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
		this.showLoading = true;
		this.yearIndex--;
		this.getLineChartData(this.chartData);
	}
	
	next() {
		this.showLoading = true;
		this.yearIndex++;
		this.getLineChartData(this.chartData);
	}
}
