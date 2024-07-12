import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPreparationComponent } from './project-preparation.component';

describe('ProjectPreparationComponent', () => {
  let component: ProjectPreparationComponent;
  let fixture: ComponentFixture<ProjectPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPreparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
