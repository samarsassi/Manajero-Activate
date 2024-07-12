import { Component, OnInit } from '@angular/core';
import { ProjectPreparation } from '../../model/project-preparation.model';
import { ProjectPreparationService } from '../../services/project-preparation.service';

@Component({
  selector: 'ngx-project-preparation',
  templateUrl: './project-preparation.component.html',
  styleUrls: ['./project-preparation.component.scss']
})
export class ProjectPreparationComponent implements OnInit {
  projectPreparations = [];
  newProjectPreparation: any = {};
  showModal = false;
  selectedProjectPreparation = null;

  constructor(private projectPreparationService: ProjectPreparationService) { }

  ngOnInit(): void {
    this.loadProjectPreparations();
  }

  loadProjectPreparations() {
    this.projectPreparationService.getAllProjectPreparations().subscribe((data: any) => {
      this.projectPreparations = data.map(item => {
        return { ...item, showDetails: false };
      });
    });
  }

  openModal() {
    this.showModal = true;
    this.newProjectPreparation = {};
    this.selectedProjectPreparation = null;
  }

  closeModal() {
    this.showModal = false;
  }

  addOrUpdateProjectPreparation() {
    if (this.selectedProjectPreparation) {
      this.projectPreparationService.updateProjectPreparation(this.newProjectPreparation).subscribe(() => {
        this.loadProjectPreparations();
        this.closeModal();
      });
    } else {
      this.projectPreparationService.addProjectPreparation(this.newProjectPreparation).subscribe(() => {
        this.loadProjectPreparations();
        this.closeModal();
      });
    }
  }

  selectProjectPreparation(preparation) {
    this.selectedProjectPreparation = preparation;
    this.newProjectPreparation = { ...preparation };
    this.showModal = true;
  }

  deleteProjectPreparation(id) {
    if (confirm('Are you sure you want to delete this project preparation?')) {
      this.projectPreparationService.deleteProjectPreparation(id).subscribe(() => {
        this.loadProjectPreparations();
      });
    }
  }

  toggleDetails(preparation) {
    preparation.showDetails = !preparation.showDetails;
  }
}