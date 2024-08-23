import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Projects } from '../../@core/data/Projects';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DiscoverPhaseService } from '../../services/discover-phase.service';
import { DeployPhaseService } from '../../services/deploy-phase.service';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { ProjectPreparationService } from '../../services/project-preparation.service';
import { ExplorePhaseService } from '../../services/explore-phase.service';
import { SectionService } from '../../services/section.service';
import { Section } from '../../@core/data/Section';
import { DiscoverPhase } from '../../@core/data/DiscoverPhase';
import { DeployPhase } from '../../@core/data/Deploy';
import { ExplorePhase } from '../../@core/data/ExplorePhase.Model';
import { ProjectPreparation } from '../../@core/data/project-preparation.model';

@Component({
  selector: 'ngx-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  sections: Section[] = [];

  // Explore Phase
  explorephases: any[] = [];
  selectedExplorePhase: any = null;
  newExplorerPhase: any = {};
  showphase: boolean = false;
  backlogDocumentFile: File | null = null;
  backlogDocumentFileName: string | null = null;  // For displaying the file name
  explorationPhaseForm: FormGroup;

  migrationModelsOptions: string[] = ['System Copy', 'Data Migration', 'Technical Migration','Functional Migration','Cloud Migration','Selective Data Transition'];
  standardProcessExecutionOptions: string[] = [
    'Order-to-Cash (O2C)',
    'Procure-to-Pay (P2P)',
    'Record-to-Report (R2R)',
    'Hire-to-Retire (H2R)',
    'Plan-to-Produce (P2P)',
    'Customer Service Management (CSM)',
    'Product Lifecycle Management (PLM)',
    'Project System (PS)'
  ];

  // Project Preparation Phase
  projectPreparations: any[] = [];
  newProjectPreparation: FormGroup;

  showModal: boolean = false;
  selectedProjectPreparation: any = null;

  // Discover Phase
  discoverForm: FormGroup;
  roadmapFile: File | null = null;
  roadmapFileName: string | null = null;  // For displaying the file name
  isSubmitting = false;
  selectedCapabilities = {
    automation: false,
    analytics: false,
    integration: false,
    scalability: false,
    userFriendly: false,
    compliance: false,
    customizability: false
  };

  // Deploy Phase
  deployForm: FormGroup;
  selectedPhase: any;
  project: Projects | undefined;
  projectForm: FormGroup;
  notauth: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private discoverPhaseService: DiscoverPhaseService,
    private deployPhaseService: DeployPhaseService,
    private toastrService: NbToastrService,
    private projectPreparationService: ProjectPreparationService,
    private ExplorePhaseService: ExplorePhaseService,
    private sectionService: SectionService
  ) {
    this.projectForm = this.fb.group({
      id:[''],
      projectTitle: ['', [Validators.required, Validators.minLength(5)]],
      projectManager: ['', Validators.required],
      dateSubmitted: ['', Validators.required],
      status: ['', Validators.required],
      statementWork: ['', Validators.required],
      archived: [false]
    });
    this.deployForm = this.fb.group({
      deploymentPlan: [''],
      goLiveDate: [''],
      systemConfiguration: [''],
      dataMigrationStrategy: [''],
      userTrainingPlan: [''],
      cutoverPlan: [''],
      supportPlan: [''],
      goLiveChecklist: [null],
      postGoLiveMonitoringPlan: [''],
      changeManagementActivities: [''],
      deploymentTeamMembers: [''],
      lessonsLearned: [''],
      approvalStatus: [''],
      approvalDate: ['']
    });

    this.discoverForm = this.fb.group({
      companyName: [''],
      industry: [''],
      currentChallenges: [''],
      requiredCapabilities: [[]],
      roadmap: [null],
      expectedValue: [''],
      phaseStartDate: [''],
      phaseEndDate: [''],
      phaseStatus: ['']
    });

    this.newProjectPreparation = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectManager: ['', Validators.required],
      developer: ['', Validators.required],
      businessAnalyst: ['', Validators.required],
      projectObjectives: ['', Validators.required],
      initialPlanning: ['', Validators.required],
      activitiesValidation: ['', Validators.required],
      rolesResponsibilities: ['', Validators.required],
      governanceProcedures: ['', Validators.required],
      riskAssessment: ['', Validators.required],
      budget: ['', Validators.required],
      stakeholderCommunication: ['', Validators.required],
      prepprojectid: ['', Validators.required]
    });
    this.explorationPhaseForm = this.fb.group({
      finalizedBusinessProcesses: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[A-Za-z\\s]+')]],
      keyDeliverables: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      migrationModels: ['', Validators.required],
      standardProcessExecution: ['', Validators.required],
      additionalObjects: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      configurationValues: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      backlogDocument: [null],
      scenarioValidation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      exprojectid: ['', Validators.required]
    });
  
  }

  redirectToPagesEdit() {
    this.router.navigate(['/pages/edit']);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.roadmapFile = input.files[0];
      this.roadmapFileName = this.roadmapFile.name;
      console.log('Selected roadmap file:', this.roadmapFileName);
    }
  }

  onFileSelectDeploy(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.deployForm.patchValue({
        [fieldName]: file
      });
      console.log(`Selected file for ${fieldName}:`, file.name);
    }
  }

  updateCapabilities(event: any, capability: string) {
    const isChecked = event.target.checked;
    this.selectedCapabilities[capability] = isChecked;
    this.discoverForm.patchValue({
      requiredCapabilities: Object.keys(this.selectedCapabilities).filter(c => this.selectedCapabilities[c])
    });
  }

  onSubmitDiscover() {
    if (this.discoverForm.valid && this.project) {
      this.isSubmitting = true;
      const discoverPhase: DiscoverPhase = {
        companyName: this.discoverForm.get('companyName')?.value,
        industry: this.discoverForm.get('industry')?.value,
        currentChallenges: this.discoverForm.get('currentChallenges')?.value,
        requiredCapabilities: this.discoverForm.get('requiredCapabilities')?.value,
        expectedValue: this.discoverForm.get('expectedValue')?.value,
        phaseStartDate: this.discoverForm.get('phaseStartDate')?.value,
        phaseEndDate: this.discoverForm.get('phaseEndDate')?.value,
        phaseStatus: this.discoverForm.get('phaseStatus')?.value,
         roadmap: this.roadmapFile ? this.roadmapFile.name : ''
      };
      this.discoverPhaseService.addDiscover(discoverPhase);

      const updatedProject = { ...this.project, discoverPhase: discoverPhase };

      // Submit the updated project
      this.projectsService.updateProject(updatedProject).subscribe(
        response => {
          this.toastrService.show('Discover Phase submitted successfully!', 'Success');
          this.stepper.next();
          this.isSubmitting = false;
        },
        error => {
          console.error('Error submitting form', error);
          this.isSubmitting = false;
        }
      );
    }
  }

  onSubmitDeploy() {
    if (this.deployForm.valid && this.project) {
        this.isSubmitting = true;

        // Create a DeployPhase object from form values
        const deployPhase: DeployPhase = {
            deploymentPlan: this.deployForm.get('deploymentPlan')?.value,
            goLiveDate: this.deployForm.get('goLiveDate')?.value,
            systemConfiguration: this.deployForm.get('systemConfiguration')?.value,
            dataMigrationStrategy: this.deployForm.get('dataMigrationStrategy')?.value,
            userTrainingPlan: this.deployForm.get('userTrainingPlan')?.value,
            cutoverPlan: this.deployForm.get('cutoverPlan')?.value,
            supportPlan: this.deployForm.get('supportPlan')?.value,
            postGoLiveMonitoringPlan: this.deployForm.get('postGoLiveMonitoringPlan')?.value,
            changeManagementActivities: this.deployForm.get('changeManagementActivities')?.value,
            deploymentTeamMembers: this.deployForm.get('deploymentTeamMembers')?.value,
            lessonsLearned: this.deployForm.get('lessonsLearned')?.value,
            approvalStatus: this.deployForm.get('approvalStatus')?.value,
            approvalDate: this.deployForm.get('approvalDate')?.value
        };

        // Add the DeployPhase
        this.deployPhaseService.addDeploy(deployPhase).subscribe(
            response => {
                // Integrate the new or updated deployPhase into the project
                const updatedProject = {
                    ...this.project,
                    deployPhase: deployPhase // Set the deploy phase
                };

                // Submit the updated project
                this.projectsService.updateProject(updatedProject).subscribe(
                    response => {
                        this.toastrService.show('Deploy Phase and Project updated successfully!', 'Success');
                        this.stepper.next();
                        this.isSubmitting = false;
                    },
                    error => {
                        console.error('Error submitting project update', error);
                        this.toastrService.danger('Error updating project.', 'Error');
                        this.isSubmitting = false;
                    }
                );
            },
            error => {
                console.error('Error submitting Deploy Phase', error);
                this.toastrService.danger('Error submitting Deploy Phase.', 'Error');
                this.isSubmitting = false;
            }
        );
    }
}


  // Explore Phase Methods
  getData() {
    this.ExplorePhaseService.getAllExplorePhases().subscribe(
      (data: ExplorePhase[]) => {
        this.explorephases = data
          .filter(item => item.projectid === this.project.id) // Filter by projectId
          .map(item => ({ ...item, showDetails: false })); // Add showDetails property
      },
      (error) => {
        console.error('Error loading explore phases:', error);
      }
    );
  }


  addOrUpdateExplorephase() {
      const explorePhaseData: ExplorePhase = {
        finalizedBusinessProcesses: this.explorationPhaseForm.get('finalizedBusinessProcesses')?.value,
        keyDeliverables: this.explorationPhaseForm.get('keyDeliverables')?.value,
        migrationModels: this.explorationPhaseForm.get('migrationModels')?.value,
        standardProcessExecution: this.explorationPhaseForm.get('standardProcessExecution')?.value,
        additionalObjects: this.explorationPhaseForm.get('additionalObjects')?.value,
        configurationValues: this.explorationPhaseForm.get('configurationValues')?.value,
        backlogDocument: this.explorationPhaseForm.get('backlogDocument')?.value,
        scenarioValidation: this.explorationPhaseForm.get('scenarioValidation')?.value,
        projectid: this.project.id // Ensure the project ID is included
      };
  
      if (this.selectedExplorePhase) {
        // Update existing ExplorePhase
        this.ExplorePhaseService.updateExplorePhase(explorePhaseData).subscribe(
          () => {
            this.getData();
            this.closeModalEx();
            this.toastrService.success('Explore phase updated successfully');
          },
          (error) => {
            console.error('Error updating explore phase', error);
            this.toastrService.danger('Failed to update explore phase');
          }
        );
      } else {
        // Create new ExplorePhase
        this.ExplorePhaseService.createExplorePhase(explorePhaseData).subscribe(
          () => {
            this.getData();
            this.closeModalEx();
            this.toastrService.success('Explore phase created successfully');
          },
          (error) => {
            console.error('Error creating explore phase', error);
            this.toastrService.danger('Failed to create explore phase');
          }
        );
      }
    
  }
  
  

  openModalEx() {
    this.showphase = true;
    this.explorationPhaseForm.reset();
    this.selectedExplorePhase = null;
  }

  closeModalEx() {
    this.showphase = false;
  }

  selectExplorePhase(phase: any) {
    this.selectedExplorePhase = phase;
    this.newExplorerPhase = { ...phase };
    this.openModalEx();
  }

  deleteExplorePhase(id: string) {
    if (confirm('Are you sure you want to delete this Explore Phase?')) {
      this.ExplorePhaseService.deleteExplorePhase(id).subscribe(() => {
        this.getData();
      });
    }
  }

  toggleDetailsEx(phase: any) {
    phase.showDetails = !phase.showDetails;
  }

  // Project Preparation Phase Methods
  loadProjectPreparations() {
    this.projectPreparationService.getAllProjectPreparations().subscribe(
      (data: any) => {
        this.projectPreparations = data
          .filter(item => item.projectid === this.project.id)  // Filter by projectId
          .map(item => ({ ...item, showDetails: false }));     // Add showDetails property
          
        console.log('Loaded project preparations:', this.projectPreparations);
      },
      (error) => {
        console.error('Error loading project preparations:', error);
      }
    );
}


  openModal() {
    this.showModal = true;
    this.newProjectPreparation.reset(); // Reset the form controls
    this.selectedProjectPreparation = null;
  }
  
  closeModal() {
    this.showModal = false;
  }

  addOrUpdateProjectPreparation() {
    const projectPreparation: ProjectPreparation = {
      startDate: this.newProjectPreparation.get('startDate')?.value,
      endDate: this.newProjectPreparation.get('endDate')?.value,
      projectManager: this.newProjectPreparation.get('projectManager')?.value,
      developer: this.newProjectPreparation.get('developer')?.value,
      businessAnalyst: this.newProjectPreparation.get('businessAnalyst')?.value,
      projectObjectives: this.newProjectPreparation.get('projectObjectives')?.value,
      initialPlanning: this.newProjectPreparation.get('initialPlanning')?.value,
      activitiesValidation: this.newProjectPreparation.get('activitiesValidation')?.value,
      rolesResponsibilities: this.newProjectPreparation.get('rolesResponsibilities')?.value,
      governanceProcedures: this.newProjectPreparation.get('governanceProcedures')?.value,
      riskAssessment: this.newProjectPreparation.get('riskAssessment')?.value,
      budget: this.newProjectPreparation.get('budget')?.value,
      stakeholderCommunication: this.newProjectPreparation.get('stakeholderCommunication')?.value,
      projectid:this.project.id
    };
    if (this.selectedProjectPreparation) {
     console.log(this.newProjectPreparation);
      this.projectPreparationService.updateProjectPreparation(projectPreparation).subscribe(() => {
        this.loadProjectPreparations();
        this.closeModal();
      });
    } else {
      this.projectPreparationService.addProjectPreparation(projectPreparation).subscribe(() => {
      
        console.log(projectPreparation, this.project);
        this.loadProjectPreparations();
        this.closeModal();
      });
    }
  }


  selectProjectPreparation(preparation: any) {
    this.selectedProjectPreparation = preparation;
    this.newProjectPreparation = { ...preparation };
    this.openModal();
  }

  deleteProjectPreparation(id: string) {
    if (confirm('Are you sure you want to delete this project preparation?')) {
      this.projectPreparationService.deleteProjectPreparation(id).subscribe(() => {
        this.loadProjectPreparations();
      });
    }
  }

  toggleDetails(preparation: any) {
    preparation.showDetails = !preparation.showDetails;
  }


  ngOnInit(): void {
    this.loadProjectPreparations();
    this.getData();

    this.sectionService.getSections().subscribe(data => {
      this.sections = data;
      console.log(this.sections);
    });
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.getProjectById(projectId);
    }
  }

  getProjectById(id: string): void {
    this.projectsService.getProjectById(id).subscribe({
      next: (project: Projects) => {
        this.project = project;
          this.setDeployForm(this.project.deployPhase);
          this.setDiscoverForm(this.project.discoverPhase);
      },
      error: (err) => {
        console.error('Error retrieving project:', err);
      }
    });
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  
  setDiscoverForm(discoverPhase: DiscoverPhase) {
    this.discoverForm.patchValue({
      companyName: discoverPhase.companyName,
      industry: discoverPhase.industry,
      currentChallenges: discoverPhase.currentChallenges,
      expectedValue: discoverPhase.expectedValue, 
      phaseStartDate: this.formatDate(discoverPhase.phaseStartDate),
      phaseEndDate: this.formatDate(discoverPhase.phaseEndDate),
      phaseStatus: discoverPhase.phaseStatus
      
    });
    const capabilities = discoverPhase.requiredCapabilities.length > 0 ? discoverPhase.requiredCapabilities : ['automation', 'integration']; // Default selected capabilities

    const allCapabilities = [
      'automation', 
      'analytics', 
      'integration', 
      'scalability', 
      'userFriendly', 
      'compliance', 
      'customizability'
    ];
   
    
    const control = this.discoverForm.get('requiredCapabilities') as FormArray;
    console.log('Capabilities:', capabilities);
    console.log('Form Structure:', this.discoverForm.value);
    console.log('Form Array:', control.value);  
    if (control && control.controls.length === allCapabilities.length) {
      allCapabilities.forEach((capability, index) => {
        if (index < control.length) {
          // Ensure the control at the index is a FormControl
          const formControl = control.at(index) as FormControl;
          if (formControl) {
            formControl.setValue(capabilities.includes(capability));
          }
        }
      });
    } else {
      console.error('FormArray length mismatch');
    }
    // Set the roadmap file information
    this.roadmapFileName = discoverPhase.roadmap; // Adjust if needed
  }

  setDeployForm(deployPhase: DeployPhase) {
    this.deployForm.patchValue({
      deploymentPlan: deployPhase.deploymentPlan,
      goLiveDate: this.formatDate(deployPhase.goLiveDate),
      systemConfiguration: deployPhase.systemConfiguration,
      dataMigrationStrategy: deployPhase.dataMigrationStrategy,
      userTrainingPlan: deployPhase.userTrainingPlan,
      cutoverPlan: deployPhase.cutoverPlan,
      supportPlan: deployPhase.supportPlan,
      postGoLiveMonitoringPlan: deployPhase.postGoLiveMonitoringPlan,
      changeManagementActivities: deployPhase.changeManagementActivities,
      deploymentTeamMembers: deployPhase.deploymentTeamMembers,
      lessonsLearned: deployPhase.lessonsLearned,
      approvalStatus: deployPhase.approvalStatus,
      approvalDate: this.formatDate(deployPhase.approvalDate)
    });
  }

  goToPhase(phase: string): void {
    if (this.project?.id) {
      this.router.navigate([`/${phase}`, this.project.id]);
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.project) {
      const updatedProject = { ...this.project, ...this.projectForm.value };
      
      this.projectsService.updateProject(updatedProject).subscribe({
        next: (response: Projects) => {
          console.log('Project updated:', response);
  
          // Update the local project object
          this.project = response;
  
          // Re-populate the form with the updated data
          this.projectForm.patchValue({
            id: response.id,
            projectTitle: response.title,
            projectManager: response.projectManager,
            dateSubmitted: response.dateSubmitted,
            status: response.status,
            statementWork: response.statementWork,
            archived: response.archived
          });
  
          this.notauth = false;
        },
        error: (err) => {
          console.error('Error updating project:', err);
        }
      });
    }
  }
  

  flipeditProject(project: Projects): void {
    this.notauth=true;
    console.log('Editing project:', project);
    this.projectForm.setValue({
      id: project.id || '',
      projectTitle: project.title || '',
      projectManager: project.projectManager || '',
      dateSubmitted: project.dateSubmitted || '',
      status: project.status || '',
      statementWork: project.statementWork || '',
      archived: project.archived || ''
    });
    console.log('nonauth:', this.notauth);
    
  }

 
  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectsService.deleteProject(id).subscribe(() => this.router.navigate(['pages/projectslist']));
    }
    this.toastrService.show('Project deleted successfully!', 'Danger', {
    })
  }


  goBack(): void {
    this.router.navigate(['pages/projectslist']); 
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    if (window.pageYOffset > 100) {
      scrollUpBtn!.style.display = 'block';
    } else {
      scrollUpBtn!.style.display = 'none';
    }
  }

  // Scroll to the top of the page
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
