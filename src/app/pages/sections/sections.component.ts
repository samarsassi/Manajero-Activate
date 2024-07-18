import { Component, OnInit } from '@angular/core';
import { Section } from '../../@core/data/Section';
import { SectionService } from '../../services/section.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private sectionService: SectionService, private fb: FormBuilder) {
    this.sectionForm = this.fb.group({
      id: [''],
      title: [''],
      content: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadSections();
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
  }

  editSection(section: Section): void {
    this.sectionForm.setValue(section);
    this.previewUrl = section.imageUrl;
  }

  deleteSection(id: string): void {
    if (confirm('Are you sure you want to delete this section?')) {
      this.sectionService.deleteSection(id).subscribe(() => this.loadSections());
    }
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}