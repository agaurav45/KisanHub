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
	public chartData1:any =[];
	public chartData2:any =[];
	public yearList:any =[];
	public selectedStartYear:any= '';
	public selectedEndYear:any = '';
	public lineChartType:string = 'line';
	public lineChartData1:any = [];
	public lineChartData2:any = [];
	public lineChartLabels1:any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	public lineChartLabels2:any = [];
	public lineChartOptions:any = { responsive: true };
	public lineChartLegend:boolean = true;
	
	
	constructor(public _chartService: ChartDataService) { }

	ngOnInit() {
		for(let i = 1910; i<=2017; i++) { 
			this.yearList.push(i);
		}
		for(let i=0; i<12; i++) {
			this.chartData2[i] = [];
		}
	}
	
	getChart() {
		this.initialChartData=[];
		this.lineChartData1 = [];
		this.lineChartData2 = [];
		this.lineChartLabels2 = [];	
		this.showLoading = true;
		this._chartService.getChartData(this.selectedMetric, this.selectedLocation, (result) => {
			this.initialChartData = result;
			let temp1 = this.initialChartData.slice(0);
			while (temp1.length > 0) {
				this.chartData1.push(temp1.splice(0, 12));
			}
			this.initialChartData.forEach((value)=> {
				this.chartData2[value.month -1].push(value);
			});
			this.getLineChartData(this.chartData1, this.chartData2);
        });		
	}
	
	getLineChartData(chartData1, chartData2) {
		this.lineChartData1 = [];
		this.lineChartData2 = [];
		this.lineChartLabels2 = [];		
		let start = this.selectedStartYear - 1910;
		let end = this.selectedEndYear - 1910;
		chartData1.forEach((ele1, index1) => {	
			if(index1>= start && index1 <= end) {
				let data = [];
				ele1.forEach((ele2)=> {
					data.push(ele2.value);	
				});
				this.lineChartData1.push({data:data, label: ele1[0].year})
			}
		});
		chartData2.forEach((ele1, index1) => {
			let data = [];
			ele1.forEach((ele2, index2)=> {				
				if(index2>= start && index2 <= end) {
					data.push(ele2.value);	
					if(index1 == 0) {
						this.lineChartLabels2.push(ele2.year);
					}
				}					
			});
			this.lineChartData2.push({data:data, label: this.monthMap[ele1[0].month]})
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
		this.selectedStartYear--;
		this.selectedEndYear--;
		this.getLineChartData(this.chartData1, this.chartData2);
	}
	
	next() {
		this.showLoading = true;
		this.selectedStartYear++;
		this.selectedEndYear++;
		this.getLineChartData(this.chartData1, this.chartData2);
	}
}
