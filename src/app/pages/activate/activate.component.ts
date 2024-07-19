import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscoverPhaseService } from '../../services/discover-phase.service';
import { DiscoverPhase } from '../../@core/data/DiscoverPhase';
import { DeployPhaseService } from '../../services/deploy-phase.service';
import { DeployPhase } from '../../@core/data/Deploy';
import { NbToastrService,NbGlobalPosition, NbStepperComponent  } from '@nebular/theme';
import { ProjectPreparationService } from '../../services/project-preparation.service';
import { ExplorePhaseService } from '../../services/explore-phase.service';
import { Router } from '@angular/router';
import { Section } from '../../@core/data/Section';
import { SectionService } from '../../services/section.service';

@Component({
  selector: 'ngx-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;  // Reference to the stepper component


  sections: Section[] = [];
  ////Explore Phase
  explorephases: [];
  selectedExplorePhase: null;
  newExplorerPhase: any = {};
  showphase: boolean = false;

 // Preparation Phase
  projectPreparations = [];
  newProjectPreparation: any = {};
  showModal = false;
  selectedProjectPreparation = null;

 // Discover Phase
    discoverForm: FormGroup;
    deployForm: FormGroup;
    isSubmitting = false;
    selectedPhase: string | null = null;
    
    selectPhase(phase: string) {
      this.selectedPhase = phase;
    }
    selectedCapabilities = {
      automation: false,
      analytics: false,
      integration: false,
      scalability: false,
      userFriendly: false,
      compliance: false,
      customizability: false
    };
    selectedStatus: string = '';
    selectedIndustry: string = '';
    roadmapFile: File | null = null;
  
    constructor(private fb: FormBuilder, private discoverPhaseService: DiscoverPhaseService,
       private deployPhaseService: DeployPhaseService,
       private toastrService: NbToastrService,
       private projectPreparationService: ProjectPreparationService,
       private ExplorePhaseService: ExplorePhaseService,
      private router: Router,
      private sectionService: SectionService) {
      
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
    }
   
    ngOnInit(): void {
      this.discoverForm = this.fb.group({
        companyName: [''],
        industry: [''],
        currentChallenges: [''],
        requiredCapabilities: [[]],
        roadmap: [null],  // Initialize as null for file
        expectedValue: [''],
        phaseStartDate: [''],
        phaseEndDate: [''],
        phaseStatus: ['']
      });
      this.loadProjectPreparations();
      this.getData();

      this.sectionService.getSections().subscribe(data => {
        this.sections = data;
        console.log(this.sections); // Debugging line to check data
      });
    
    }
   redirectToPagesEdit() {
      this.router.navigate(['/pages/edit']);
    }
    onFileSelect(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.roadmapFile = input.files[0];
        console.log('Selected file:', this.roadmapFile.name);
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
         formData.append('roadmap', this.roadmapFile.name); // Send only the file name
        formData.append('expectedValue', this.discoverForm.get('expectedValue')?.value);
        formData.append('phaseStartDate', this.discoverForm.get('phaseStartDate')?.value);
        formData.append('phaseEndDate', this.discoverForm.get('phaseEndDate')?.value);
        formData.append('phaseStatus', this.discoverForm.get('phaseStatus')?.value);
  
         // Convert FormData to JSON
            const jsonObject = {};
            formData.forEach((value, key) => {
              if (jsonObject[key]) {
                // If the key already exists, convert it into an array
                if (!Array.isArray(jsonObject[key])) {
                  jsonObject[key] = [jsonObject[key]];
                }
                jsonObject[key].push(value);
              } else {
                jsonObject[key] = value;
              }
            });

            // Convert FormData array values back to their proper formats
            jsonObject['requiredCapabilities'] = JSON.parse(jsonObject['requiredCapabilities'] as string);  // Convert JSON string back to array
            jsonObject['phaseStartDate'] = new Date(jsonObject['phaseStartDate'] as string);
            jsonObject['phaseEndDate'] = new Date(jsonObject['phaseEndDate'] as string);

            this.discoverPhaseService.addDiscover(jsonObject as DiscoverPhase).subscribe(
              response => {
                this.toastrService.show('Discover Phase submitted successfully!', 'Success', {
                })
                // Move to the next step in the stepper
                this.stepper.next();
                this.isSubmitting = false;  // Hide the loading spinner
              },
              error => {
                console.error('Error submitting form', error);
              }
            );
          }
        }


 // Deploy Phase

 onFileSelectDeploy(event: any, fieldName: string) {
  const file = event.target.files[0];
  if (file) {
    this.deployForm.patchValue({
      [fieldName]: file
    });
  }
}

onSubmitDeploy() {
  if (this.deployForm.valid) {
  const formData = new FormData();
  this.isSubmitting = true;  // Show the loading spinner
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
// Convert FormData to JSON
const jsonObject = {};
formData.forEach((value, key) => {
  if (jsonObject[key]) {
    // If the key already exists, convert it into an array
    if (!Array.isArray(jsonObject[key])) {
      jsonObject[key] = [jsonObject[key]];
    }
    jsonObject[key].push(value);
  } else {
    jsonObject[key] = value;
  }
});

  // Convert FormData array values back to their proper formats
 
  jsonObject['approvalDate'] = new Date(jsonObject['approvalDate'] as string);
  jsonObject['goLiveDate'] = new Date(jsonObject['goLiveDate'] as string);

  this.deployPhaseService.addDeploy(jsonObject as DeployPhase).subscribe(
    response => {
      this.toastrService.show('Deploy Phase submitted successfully!', 'Success', {
      })
      // Move to the next step in the stepper
      this.stepper.next();
      this.isSubmitting = false;  // Hide the loading spinner
    },
    error => {
      this.toastrService.danger('Error submitting Deploy Phase.', 'Error', {
        duration: 5000,
        icon: 'close-circle-outline',
        destroyByClick: true,
      });
    }
  );
  }
  }

  //Preparation Phase
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

  //End Preparation Phase

  //////Explore Phase
 
  getData() {
    this.ExplorePhaseService.getAllExplorePhases().subscribe((data: any) => {
      this.explorephases = data.map(item => {
        return { ...item, showDetails: false };
      });
    });
  }
  addOrUpdateexplorephase() {
    if (this.selectedExplorePhase) {
      this.ExplorePhaseService.updateExplorePhase(this.newExplorerPhase).subscribe(() => {
        this.getData();
        this.closeModal();
      });
    } else {
      this.ExplorePhaseService.createExplorePhase(this.newExplorerPhase).subscribe(() => {
        this.getData();
        this.closeModal();
      });
    }
  }

  openModalEx() {
    this.showphase = true;
    this.newExplorerPhase = {};
    this.selectedExplorePhase = null;
  }
  closeModalEx() {
    this.showphase = true;
  }

  selectExplorePhase(preparation) {
    this.selectedExplorePhase = preparation;
    this.newExplorerPhase = { ...preparation };
    this.showphase = false;
  }

  deleteExplorePhase(id) {
    if (confirm('Are you sure you want to delete this project preparation?')) {
      this.ExplorePhaseService.deleteExplorePhase(id).subscribe(() => {
        this.getData();
      });
    }
  }

  toggleDetailsEx(preparation) {
    preparation.showDetails = !preparation.showDetails;
  }
}


 