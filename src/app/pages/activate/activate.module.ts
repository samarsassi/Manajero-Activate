import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbButtonModule, NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbListModule, NbAccordionModule, NbUserModule, NbSelectModule, NbCheckboxModule, NbTooltipModule, NbPopoverModule, NbIconModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { ActivateComponent } from './activate.component';
import { HttpClientModule } from '@angular/common/http';
import { EchartsPieComponent } from '../charts/echarts/echarts-pie.component';
import { NgxEchartsModule } from 'ngx-echarts';


    const components = [
        
        EchartsPieComponent,
      ];
    @NgModule({
    declarations: [ActivateComponent],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbStepperModule,
        NbListModule,
        NbAccordionModule,
        NbUserModule,
        NbSelectModule,
        NbCheckboxModule,
        NbPopoverModule,
        NbIconModule,
        NbCardModule,
        NbSpinnerModule,
        NbToastrModule,
        NgxEchartsModule,
    ],
    exports: [ActivateComponent]
})
export class ActivateModule { }