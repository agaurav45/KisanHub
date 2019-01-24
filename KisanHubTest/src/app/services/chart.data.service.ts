import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,flatMap,mergeMap,switchMap,catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class ChartDataService {
	baseUrl = "https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/";
	
	constructor(private http:HttpClient) { 
	}							
	
	getChartData(metric, location, callback){
		return this.http.get(this.baseUrl + metric + '-' + location + '.json')
		.pipe(map(resp=>resp)).subscribe(result => {
			callback(result);
		},
		error => {
			callback(error);
		},
		() => {

		});
    }

}