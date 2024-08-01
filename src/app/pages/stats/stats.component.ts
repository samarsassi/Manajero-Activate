import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ExplorePhaseService } from '../../services/explore-phase.service';
import { ExplorePhase } from '../../@core/data/ExplorePhase.Model';

@Component({
  selector: 'ngx-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  migrationModelData: any;
  standardProcessExecutionData: any;


  constructor(private explorePhaseService: ExplorePhaseService){};
  
  ngOnInit(): void {
    this.explorePhaseService.getAllExplorePhases().subscribe(
      (data: ExplorePhase[]) => {
        this.aggregateData(data);
        this.createCharts();
      },
      (error) => {
        console.error('Error loading explore phases:', error);
      }
    );
  }

  aggregateData(phases: ExplorePhase[]): void {
    const migrationModelCounts: { [key: string]: number } = {};
    const processExecutionCounts: { [key: string]: number } = {};

    phases.forEach(phase => {
      // Count migration models
      if (phase.migrationModels) {
        migrationModelCounts[phase.migrationModels] = (migrationModelCounts[phase.migrationModels] || 0) + 1;
      }

      // Count standard process executions
      if (phase.standardProcessExecution) {
        processExecutionCounts[phase.standardProcessExecution] = (processExecutionCounts[phase.standardProcessExecution] || 0) + 1;
      }
    });

    this.migrationModelData = {
      labels: Object.keys(migrationModelCounts),
      datasets: [{
        data: Object.values(migrationModelCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

    this.standardProcessExecutionData = {
      labels: Object.keys(processExecutionCounts),
      datasets: [{
        data: Object.values(processExecutionCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
      }]
    };
  }

  createCharts(): void {
    // Migration Models Chart
    const ctxMigration = (document.getElementById('migrationModelsChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctxMigration, {
      type: 'pie',
      data: this.migrationModelData
    });

    // Standard Process Execution Chart
    const ctxProcess = (document.getElementById('standardProcessExecutionChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctxProcess, {
      type: 'pie',
      data: this.standardProcessExecutionData
    });
  }

}
