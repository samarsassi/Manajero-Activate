import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { Router } from '@angular/router';

import { DiscoverPhaseService } from '../../services/discover-phase.service';
import { DeployPhaseService } from '../../services/deploy-phase.service';
import { ProjectPreparationService } from '../../services/project-preparation.service';
import { ExplorePhaseService } from '../../services/explore-phase.service';
import { SectionService } from '../../services/section.service';

import { DiscoverPhase } from '../../@core/data/DiscoverPhase';
import { DeployPhase } from '../../@core/data/Deploy';
import { Section } from '../../@core/data/Section';
import { ExplorePhase } from '../../@core/data/ExplorePhase.Model';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

@Component({
  selector: 'ngx-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  sections: Section[] = [];

  // Explore Phase
  explorephases: any[] = [];
  selectedExplorePhase: any = null;
  newExplorerPhase: any = {};
  showphase: boolean = false;
  backlogDocumentFile: File | null = null;
  backlogDocumentFileName: string | null = null;  // For displaying the file name
  showStats: boolean = false;

  migrationModelsOptions: string[] = ['System Copy', 'Data Migration', 'Technical Migration', 'Functional Migration', 'Cloud Migration', 'Selective Data Transition'];
  
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
  newProjectPreparation: any = {};
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
  exploreForm: FormGroup;
  activate: any;
  stats: any;

  // Explore Phase Stats
  public migrationModelsChartData: ChartData<'bar'>;
  public migrationModelsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  public standardProcessExecutionChartData: ChartData<'bar'>;
  public standardProcessExecutionChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  constructor(
    private fb: FormBuilder,
    private discoverPhaseService: DiscoverPhaseService,
    private deployPhaseService: DeployPhaseService,
    private toastrService: NbToastrService,
    private projectPreparationService: ProjectPreparationService,
    private explorePhaseService: ExplorePhaseService,
    private router: Router,
    private sectionService: SectionService
  ) {
    Chart.register(...registerables);

    this.exploreForm = this.fb.group({
      finalizedBusinessProcesses: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[A-Za-z\\s]+')]],
      keyDeliverables: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      migrationModels: ['', [Validators.required]],
      standardProcessExecution: ['', [Validators.required]],
      additionalObjects: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      configurationValues: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      backlogDocument: [null],
      scenarioValidation: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
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
  }

  ngOnInit(): void {
    this.loadProjectPreparations();
    this.getData();
    this.initializeChartData();

    this.sectionService.getSections().subscribe(data => {
      this.sections = data;
      console.log(this.sections);
    });
  }

  toggleStats(): void {
    this.showStats = !this.showStats;
    if (this.showStats) {
      setTimeout(() => {
        this.initializeChartData();
      }, 0);
    }
  }

  private initializeChartData(): void {
    const migrationModelsCtx = document.getElementById('migrationModelsChart') as HTMLCanvasElement;
    const standardProcessExecutionCtx = document.getElementById('standardProcessExecutionChart') as HTMLCanvasElement;

    if (migrationModelsCtx) {
      this.migrationModelsChartData = {
        labels: ['Phase 1', 'Phase 2', 'Phase 3'],
        datasets: [{
          label: 'Migration Models',
          data: [12, 19, 3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      };

      new Chart(migrationModelsCtx, {
        type: 'bar',
        data: this.migrationModelsChartData,
        options: this.migrationModelsChartOptions
      });
    }

    if (standardProcessExecutionCtx) {
      this.standardProcessExecutionChartData = {
        labels: ['Phase 1', 'Phase 2', 'Phase 3'],
        datasets: [{
          label: 'Standard Process Execution',
          data: [15, 29, 5],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      };

      new Chart(standardProcessExecutionCtx, {
        type: 'line',
        data: this.standardProcessExecutionChartData,
        options: this.standardProcessExecutionChartOptions
      });
    }
  }

  redirectToPagesEdit() {
    this.router.navigate(['/pages/edit']);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.roadmapFile = input.files[0];
      this.roadmapFileName = this.roadmapFile.name;
      console.log('Selected roadmap file:', this.roadmapFileName,this.roadmapFile);
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
    if (this.discoverForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('companyName', this.discoverForm.get('companyName')?.value);
      formData.append('industry', this.discoverForm.get('industry')?.value);
      formData.append('currentChallenges', this.discoverForm.get('currentChallenges')?.value);
      formData.append('requiredCapabilities', JSON.stringify(this.discoverForm.get('requiredCapabilities')?.value));
      if (this.roadmapFile) formData.append('roadmap', this.roadmapFile);
      formData.append('expectedValue', this.discoverForm.get('expectedValue')?.value);
      formData.append('phaseStartDate', this.discoverForm.get('phaseStartDate')?.value);
      formData.append('phaseEndDate', this.discoverForm.get('phaseEndDate')?.value);
      formData.append('phaseStatus', this.discoverForm.get('phaseStatus')?.value);

      this.discoverPhaseService.addDiscover(formData as unknown as DiscoverPhase).subscribe(
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
    if (this.deployForm.valid) {
      const formData = new FormData();
      formData.append('deploymentPlan', this.deployForm.get('deploymentPlan')?.value);
      formData.append('goLiveDate', this.deployForm.get('goLiveDate')?.value);
      formData.append('systemConfiguration', this.deployForm.get('systemConfiguration')?.value);
      formData.append('dataMigrationStrategy', this.deployForm.get('dataMigrationStrategy')?.value);
      formData.append('userTrainingPlan', this.deployForm.get('userTrainingPlan')?.value);
      formData.append('cutoverPlan', this.deployForm.get('cutoverPlan')?.value);
      formData.append('supportPlan', this.deployForm.get('supportPlan')?.value);
      formData.append('postGoLiveMonitoringPlan', this.deployForm.get('postGoLiveMonitoringPlan')?.value);
      formData.append('changeManagementActivities', this.deployForm.get('changeManagementActivities')?.value);
      formData.append('deploymentTeamMembers', this.deployForm.get('deploymentTeamMembers')?.value);
      formData.append('lessonsLearned', this.deployForm.get('lessonsLearned')?.value);
      formData.append('approvalStatus', this.deployForm.get('approvalStatus')?.value);
      formData.append('approvalDate', this.deployForm.get('approvalDate')?.value);

      this.deployPhaseService.addDeploy(formData as unknown as DeployPhase).subscribe(
        response => {
          this.toastrService.show('Deploy Phase submitted successfully!', 'Success');
          this.stepper.next();
          this.isSubmitting = false;
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
    this.explorePhaseService.getAllExplorePhases().subscribe(
      (data: ExplorePhase[]) => {
        this.explorephases = data.map(item => ({ ...item, showDetails: false }));
      },
      (error) => {
        console.error('Error loading explore phases:', error);
      }
    );
  }



  addOrUpdateexplorephase() {
    if (this.selectedExplorePhase) {
      this.explorePhaseService.updateExplorePhase(this.newExplorerPhase).subscribe(() => {
        this.getData();
        this.closeModalEx();
      });
    } else {
      this.explorePhaseService.createExplorePhase(this.newExplorerPhase).subscribe(() => {
        this.getData();
        this.closeModalEx();
      });
    }
  }

  openModalEx() {
    this.showphase = true;
    this.newExplorerPhase = {};
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
      this.explorePhaseService.deleteExplorePhase(id).subscribe(() => {
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
        this.projectPreparations = data.map(item => ({ ...item, showDetails: false }));
        console.log('Loaded project preparations:', this.projectPreparations);
      },
      (error) => {
        console.error('Error loading project preparations:', error);
      }
    );
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
      console.log('Updating preparation:', this.newProjectPreparation);
      this.projectPreparationService.updateProjectPreparation(this.newProjectPreparation).subscribe(
        (response) => {
          console.log('Update response:', response);
          this.loadProjectPreparations();
          this.closeModal();
        },
        (error) => {
          console.error('Update error:', error);
        }
      );
    } else {
      console.log('Adding new preparation:', this.newProjectPreparation);
      this.projectPreparationService.addProjectPreparation(this.newProjectPreparation).subscribe(
        (response) => {
          console.log('Add response:', response);
          this.loadProjectPreparations();
          this.closeModal();
        },
        (error) => {
          console.error('Add error:', error);
        }
      );
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
}