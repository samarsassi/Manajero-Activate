import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { SectionService } from '../../../services/section.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  sectionForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  
  constructor(protected ref: NbDialogRef<AddDialogComponent>,
    private fb: FormBuilder,
    private sectionService: SectionService,
    private router: Router
  ) {
    this.sectionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['']
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.sectionForm.patchValue({ imageUrl: this.previewUrl });
        this.selectedFile = file; // Store the selected file
      };
      reader.readAsDataURL(file);
    }
  }

  cancel() {
    this.ref.close();
  }

  onSubmit(): void {
    if (this.sectionForm.valid) {
      const section = this.sectionForm.value;
      this.sectionService.createSection(section).subscribe(
        () => {
          this.sectionService.notifySectionUpdated(); // Notify update
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
