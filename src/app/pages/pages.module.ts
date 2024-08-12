import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NavPageModule } from './nav-page/nav-page.module';
import { ActivateModule } from './activate/activate.module';
import { SectionsModule } from './sections/Sections.module';
import { ProjectListModule } from './project-list/project-list.module';
import { StatsComponent } from './stats/stats.component';
import { ProjectDetailsModule } from './project-details/project-details.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NavPageModule,
    ECommerceModule,
    MiscellaneousModule,
    ActivateModule,
    SectionsModule,
    ProjectListModule,
    ProjectDetailsModule,
  ],
  declarations: [
    PagesComponent,
    
    
  ],
})
export class PagesModule {
}
