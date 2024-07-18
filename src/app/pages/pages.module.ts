import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbStepperModule, NbThemeModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ActivateComponent } from './activate/activate.component';
import { NavPageModule } from './nav-page/nav-page.module';
import { ActivateModule } from './activate/activate.module';
import { ProjectPreparationComponent } from './project-preparation/project-preparation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionsComponent } from './sections/sections.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    FormsModule,
    ReactiveFormsModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbIconModule,
    NbEvaIconsModule,
  ],
  declarations: [
    PagesComponent,
    ProjectPreparationComponent,
    SectionsComponent,
  ],
})
export class PagesModule {
}
