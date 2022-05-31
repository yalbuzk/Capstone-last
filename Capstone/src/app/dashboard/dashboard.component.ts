
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis : ApexYAxis
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data$ : any;
  
  dataX  =  [];
  dataY  =  [];
  dataZ  =  [];

  public chartOptions: Partial<ChartOptions>;
  
  @ViewChild("chart") chart: ChartComponent;
 
  constructor(private db: AngularFireDatabase) {
  
  }
  ngOnInit(): void {
    this.db.list('/').valueChanges().subscribe((t)=>{
      t.forEach((element:any) => {
        this.dataX.push(element.accx)
        this.dataY.push(element.accy)
        this.dataZ.push(element.accz)
      });

      this.chartOptions = {
        series: [
          {
            name: "X",
            data: this.dataX
          },
          {
            name: "X",
            data: this.dataY
          },
          {
            name: "Z",
            data: this.dataZ
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Analytics",
          align: "center"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          labels: {
            show:false
          },
          categories: [
          
          ],
        },
        yaxis: {
          logarithmic: true,
        }
      };
      this.data$ = t
    })
  }

}
