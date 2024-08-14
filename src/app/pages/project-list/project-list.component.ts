import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      statementWork: {
        title: 'Statement of Work',
        type: 'string',
      },
      projectManager: {
        title: 'Project Manager',
        type: 'string',
      },
      dateSubmitted: {
        title: 'Date Submitted',
        type: 'date',
      },
      archived: {
        title: 'Archived',
        type: 'boolean',
        editor: {
          type: 'checkbox',
          config: {
            trueLabel: 'Yes',
            falseLabel: 'No',
          }
        },
      },
    },
  };

  source: any[];
  filteredProjects: any[] = []; // Filtered list of projects
  showArchived: boolean = false; // Toggle state

  constructor(private service: ProjectsService, private toastr: NbToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects() {
    this.service.getProjects().subscribe(data => {
      this.source = data;
      this.filterProjects(); // Initialize with the default filter
    });
  }

  onToggleChange(event: any) {
    this.showArchived = event.target.checked;
    this.filterProjects();
  }

  filterProjects() {
    if (this.showArchived) {
      this.filteredProjects = this.source.filter(project => project.archived === true);
    } else {
      this.filteredProjects = this.source.filter(project => project.archived === false);
    }
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this project?')) {
      this.service.deleteProject(event.data.id).subscribe(
        () => {
          event.confirm.resolve();
          this.toastr.success('Project deleted successfully!');
        },
        (error) => {
          event.confirm.reject();
          this.toastr.danger('Failed to delete project.');
          console.error('Delete failed', error);
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    this.service.updateProject(event.newData).subscribe(
      (updatedProject) => {
        event.confirm.resolve(updatedProject);
        this.toastr.success('Project updated successfully!');
      },
      (error) => {
        event.confirm.reject();
        this.toastr.danger('Failed to update project.');
        console.error('Update failed', error);
      }
    );
  }

  onCardSelect(project: any) {
    this.router.navigate(['pages/project-details', project.id]);
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-in-progress';
      case 'on hold':
        return 'status-on-hold';
      case 'not started':
        return 'status-not-started';
      default:
        return 'status-default';
    }
  }
  
  goBack(): void {
    this.router.navigate(['pages/nav']); 
  }
}
