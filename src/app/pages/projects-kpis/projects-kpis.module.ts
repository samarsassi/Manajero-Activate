import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbCheckboxModule,
  NbToastrService,
  NbToastrModule,
  NbStepperModule,
  NbPopoverModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProjectsKpisComponent } from './projects-kpis.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    NbCheckboxModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbToastrModule,
    NbStepperModule,
    NbPopoverModule,
    NgxChartsModule,
    NbProgressBarModule
   
  ],
  declarations: [
    ProjectsKpisComponent
  ],
})
export class ProjectsKpisModule { }
