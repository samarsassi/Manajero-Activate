import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ActivateComponent } from './activate/activate.component';
import { PrepareFormComponent } from './PrepareForms/prepare-form/prepare-form.component';
import { ProjectPreparationComponent } from './project-preparation/project-preparation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    ActivateComponent,
    PrepareFormComponent,
    ProjectPreparationComponent,
  ],
})
export class PagesModule {
}
