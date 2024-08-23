import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { ExplorePhaseService } from '../../services/explore-phase.service';
import { ProjectPreparationService } from '../../services/project-preparation.service';

@Component({
  selector: 'ngx-projects-kpis',
  templateUrl: './projects-kpis.component.html',
  styleUrls: ['./projects-kpis.component.scss']
})
export class ProjectsKpisComponent implements OnInit {
    projectId: string;
    project: any;
    preparationPhase: any;
    explorePhase: any;
    realizePhase: any;
    discoverPhaseDuration: number | null = null;
    daysUntilGoLive: number | null = null;
    totalDeployDays: number; // Add this declaration
    progressPercentage: number; // Add this declaration
    
    gaugeData: any[] = [];
    explorePhaseData: any[] = [];
    discoverPhaseData: any[] = [];
    deployPhaseData: any[] = [];

    gaugeColorScheme = {
        domain: ['#5AA454']
    };

    exploreColorScheme = {
        domain: ['#007bff', '#ff6384', '#ff9f40']
    };

    discoverColorScheme = {
        domain: ['#17a2b8']
    };

    deployColorScheme = {
        domain: ['#28a745']
    };

    taskCompletionData = [];
    realizeColorScheme = { domain: ['#28a745', '#ffc107', '#dc3545'] }; // Green, Yellow, Red

    completionPercentage: number = 0;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private projectsService: ProjectsService,
      private preparationPhaseService: ProjectPreparationService,
      private explorePhaseService: ExplorePhaseService
    ) {}

    ngOnInit(): void {
      this.projectId = this.route.snapshot.paramMap.get('id');
      this.loadProjectKPIs();
    }

    loadProjectKPIs() {
      this.projectsService.getProjectById(this.projectId).subscribe((project) => {
        this.project = project;
        this.loadPreparationPhase();
        this.loadExplorePhase();
        this.loadRealizePhase();

        // Calculate KPIs related to Discover and Deploy phases after the project data is loaded
        if (this.project?.discoverPhase) {
          this.calculateDiscoverPhaseDuration();
        }
        if (this.project?.deployPhase) {
          this.calculateDaysUntilGoLive();
        }

        this.calculateCompletionPercentage();
      });
    }

    loadPreparationPhase() {
      this.preparationPhaseService.getAllProjectPreparations().subscribe((preparationPhases) => {
        this.preparationPhase = preparationPhases.find(phase => phase.projectid === this.project.id);
        if (this.preparationPhase) {
          this.calculatePreparationPhaseKPIs();
          this.calculateCompletionPercentage();
        }
      });
    }

    calculatePreparationPhaseKPIs() {
      if (this.preparationPhase) {
        const budget = parseFloat(this.preparationPhase.budget);
        const usedBudget = this.calculateUsedBudget();

        if (!isNaN(budget) && budget > 0) {
          const budgetUtilization = (usedBudget / budget) * 100;
          this.gaugeData = [
            {
              "name": "Utilization",
              "value": budgetUtilization
            }
          ];
        } else {
          this.gaugeData = [
            {
              "name": "Utilization",
              "value": 0
            }
          ];
        }
      }
    }

    loadExplorePhase() {
      this.explorePhaseService.getAllExplorePhases().subscribe((explorePhases) => {
        this.explorePhase = explorePhases.find(phase => phase.projectid === this.project.id);
        if (this.explorePhase) {
          this.calculateExplorePhaseKPIs();
          this.calculateCompletionPercentage();
        }
      });
    }

    calculateExplorePhaseKPIs() {
      if (this.explorePhase) {
        const migrationModelsCount = this.explorePhase.migrationModels.split(',').length;
        this.explorePhaseData = [
          {
            "name": "Migration Models",
            "value": migrationModelsCount
          },
          {
            "name": "Other Phases",
            "value": 100 - migrationModelsCount // Assuming 100 as total percentage
          }
        ];
      }
    }

    calculateDiscoverPhaseDuration() {
      const startDate = new Date(this.project.discoverPhase.phaseStartDate);
      const endDate = new Date(this.project.discoverPhase.phaseEndDate);
      this.discoverPhaseDuration = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

      this.discoverPhaseData = [
        {
          "name": "Discover Phase",
          "value": this.discoverPhaseDuration
        }
      ];

      this.calculateCompletionPercentage();
    }

    calculateDaysUntilGoLive() {
      const goLiveDate = new Date(this.project.deployPhase.goLiveDate);
      const today = new Date();
      const daysPassed = Math.ceil((today.getTime() - new Date(this.project.discoverPhase.phaseEndDate).getTime()) / (1000 * 3600 * 24));
      this.daysUntilGoLive = Math.ceil((goLiveDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
      this.totalDeployDays = daysPassed + this.daysUntilGoLive;
  
      this.deployPhaseData = [
          {
              "name": "Days Passed",
              "value": daysPassed
          },
          {
              "name": "Days Left",
              "value": this.daysUntilGoLive
          }
      ];
  
      this.progressPercentage = Math.ceil((daysPassed / this.totalDeployDays) * 100);
  }

  loadRealizePhase() {
    this.realizePhase = this.project.realizePhase;
    if (this.realizePhase) {
      this.calculateRealizePhaseKPIs();
    }
  }
  calculateRealizePhaseKPIs() {
    // Assuming each task has a status that can be 'Completed', 'In Progress', or 'Pending'
    const tasks = [
      { status: 'Completed' },
      { status: 'In Progress' },
      { status: 'Pending' }
    ]; // Replace with actual tasks if available
  
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  
    this.taskCompletionData = [
      { name: 'Completed', value: completedTasks },
      { name: 'In Progress', value: inProgressTasks },
      { name: 'Pending', value: pendingTasks }
    ];
  }
  

    calculateUsedBudget(): number {
      return 5000; // Placeholder value
    }

    calculateCompletionPercentage() {
      let completedPhases = 0;
      const totalPhases = 4; // Discover, Preparation, Explore, Deploy

      if (this.project?.discoverPhase) completedPhases++;
      if (this.preparationPhase) completedPhases++;
      if (this.explorePhase) completedPhases++;
      if (this.project?.deployPhase) completedPhases++;

      this.completionPercentage = (completedPhases / totalPhases) * 100;
    }

    valueFormatting(value: number): string {
      return `${value.toFixed(2)}%`;
    }

    goBack() {
      this.router.navigate(['/pages/activate-dashboard']);
    }
}
