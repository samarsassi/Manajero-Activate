import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { AddProjectDialogComponent } from './addproject-dialog/addproject-dialog.component';


@Component({
  selector: 'ngx-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss']
})
export class NavPageComponent {

  constructor(private router: Router, private dialogService: NbDialogService) { }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  open(): void {
    this.dialogService.open(AddProjectDialogComponent);
  }

  navigateToTuto(): void {
    this.router.navigate(['pages/activate']);
  }

  navigateToProjectList(): void {
    this.router.navigate(['pages/projectslist']);
  }

}
