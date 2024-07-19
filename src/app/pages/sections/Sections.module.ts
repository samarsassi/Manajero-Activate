import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbButtonModule, NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbListModule, NbAccordionModule, NbUserModule, NbSelectModule, NbCheckboxModule, NbTooltipModule, NbPopoverModule, NbIconModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { SectionsComponent } from './sections.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@NgModule({
  declarations: [SectionsComponent, AddDialogComponent],
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
    NbToastrModule
  ],
  exports: [SectionsComponent]
})
export class SectionsModule { }
