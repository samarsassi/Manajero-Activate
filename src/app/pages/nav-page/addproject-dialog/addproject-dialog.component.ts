import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'ngx-add-dialog',
  templateUrl: './addproject-dialog.component.html',
  styleUrls: ['./addproject-dialog.component.scss']
})
export class AddProjectDialogComponent {

  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  projectForm: FormGroup;


  constructor(protected ref: NbDialogRef<AddProjectDialogComponent>,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      statementWork: ['', [Validators.required, Validators.minLength(10)]],
      status:['Not Started', [Validators.required]],
      projectManager: [''],
      dateSubmitted: [''],
      problematic: this.fb.group({
        id: [''],
        name: [''],
        description: ['']
      }),
      archived: [false]
    });
  }

  cancel() {
    this.ref.close();
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      this.projectsService.createProject(project).subscribe(
        () => {
          this.projectsService.notifyProjectUpdated(); // Notify update
          this.ref.close('success'); // Notify successful submission

        },
        error => {
          console.error('Error saving section:', error);
          // Optionally, show an error message here
        }
      );
    }
  }



}
