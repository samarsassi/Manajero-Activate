import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbIconModule, NbThemeModule } from '@nebular/theme';

import { ActivateDashboardComponent } from './activate-dashboard.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from '../charts/charts.module';
import { ThemeModule } from '../../@theme/theme.module';

const components = [
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NgxEchartsModule, // Import NgxEchartsModule directly
    NbIconModule,
    NgxChartsModule,
    ChartsModule ,
  ],
  declarations: [ActivateDashboardComponent],
})
export class ActivateDashboardModule {}
