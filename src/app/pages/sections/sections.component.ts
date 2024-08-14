import { Component, ElementRef, OnInit } from '@angular/core';
import { Section } from '../../@core/data/Section';
import { SectionService } from '../../services/section.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@Component({
  selector: 'ngx-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  sections: Section[] = [];
  sectionForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  notauth: boolean = false;
  

  constructor(private sectionService: SectionService, private fb: FormBuilder,
    private toastrService: NbToastrService,
    private router: Router,
  private dialogService: NbDialogService ) {
    
    this.sectionForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadSections();
    this.sectionService.sectionUpdated$.subscribe(() => this.loadSections());
  }

  loadSections(): void {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
    this.toastrService.show('File uploaded successfully!', 'Success', {
    })
  }

  onSubmit(): void {
    const section: Section = this.sectionForm.value;
    if (!section.id) {
      section.id = this.generateUUID();
    }

    if (this.selectedFile) {
      section.imageUrl = this.previewUrl as string;
    }

    if (section.id) {
      this.sectionService.updateSection(section).subscribe(() => this.loadSections());
    } else {
      this.sectionService.createSection(section).subscribe(() => this.loadSections());
    }
    this.sectionForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
    this.toastrService.show('Section updated successfully!', 'Success', {
    })
    this.notauth=false;
    this.loadSections();
  }

  editSection(section: Section): void {
    this.notauth=true;
    console.log('Editing section:', section);
    this.sectionForm.setValue(section);
    this.previewUrl = section.imageUrl;
    console.log('nonauth:', this.notauth);
    
  }


  deleteSection(id: string): void {
    if (confirm('Are you sure you want to delete this section?')) {
      this.sectionService.deleteSection(id).subscribe(() => this.loadSections());
    }
    this.toastrService.show('Section deleted successfully!', 'Danger', {
    })
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  open(): void {
    this.dialogService.open(AddDialogComponent);
  }
  

  currentStep = 0;
  nextStep() {
    if (this.currentStep < this.sections.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goBack(): void {
    this.router.navigate(['pages/activate']); 
  }
}