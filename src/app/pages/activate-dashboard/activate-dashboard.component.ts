import { Component, OnInit } from '@angular/core';
import { Projects } from '../../@core/data/Projects';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-activate-dashboard',
  templateUrl: './activate-dashboard.component.html',
  styleUrls: ['./activate-dashboard.component.scss']
})
export class ActivateDashboardComponent implements OnInit {

  projects: any[];
  chartData: any[] = [];
  chartView: any[] = [400, 300]; // Adjust size if necessary
  
  // KPI variables
  ProjectsNB: Number;
  archivedProjects: number = 0;
  activeProjects: number = 0;
  projectsByStatus: { [key: string]: number } = {};
  problematicProjects: number = 0;

  archivedCount = 0;
  nonArchivedCount = 0;
  archivedPercentage = 0;
  nonArchivedPercentage = 0;
  projectManagers: Map<string, number> = new Map();
  totalManagers: number = 0; 
  projectsByName: { [name: string]: number } = {};

  constructor(private projectsService: ProjectsService, private router: Router) {}

  ngOnInit(): void {
    
      this.projectsService.getProjects().subscribe(data => {
        this.projects = data;
        console.log(data);
        this.calculateKPIs();
        
      this.calculateProjectManagers();
      });
    
  }

  calculateKPIs(): void {
    
    this.ProjectsNB = this.projects.length;
    const totalProjects = this.projects.length;

    // this.archivedProjects = this.projects.filter(project => project.archived).length;
    // this.activeProjects = this.projects.filter(project => !project.archived).length;

     // Calculate counts
    
     if (totalProjects === 0) return;

     this.archivedCount = this.projects.filter(p => p.archived).length;
     this.nonArchivedCount = totalProjects - this.archivedCount;
 
     // Calculate percentages
     this.archivedPercentage = (this.archivedCount / totalProjects) * 100; // Percentage
     this.nonArchivedPercentage = (this.nonArchivedCount / totalProjects) * 100; // Percentage
 
     // Calculate angles for conic-gradient
     const totalDegrees = 360;
     const archivedAngle = (this.archivedPercentage / 100) * totalDegrees;
     const nonArchivedAngle = (this.nonArchivedPercentage / 100) * totalDegrees;
 
     // Set CSS variables dynamically
     document.documentElement.style.setProperty('--archived-angle', `${archivedAngle}deg`);
     document.documentElement.style.setProperty('--non-archived-angle', `${nonArchivedAngle}deg`);


     this.projectsByName = {};
    this.projects.forEach(project => {
      
      if (project.status) {
        if (!this.projectsByStatus[project.status]) {
          this.projectsByStatus[project.status] = 0;
        }
        this.projectsByStatus[project.status]++;
      }

      if (project.problematic && project.problematic.name) {
        this.problematicProjects++;
      }
      if (project.title) {
        if (!this.projectsByName[project.title]) {
          this.projectsByName[project.title] = 0;
        }
        this.projectsByName[project.title]++;
      }
    });
  }
  calculateProjectManagers(): void {
    this.projectManagers.clear();
    this.ProjectsNB = this.projects.length;

    this.projects.forEach(project => {
      if (project.projectManager) {
        if (this.projectManagers.has(project.projectManager)) {
          this.projectManagers.set(project.projectManager, this.projectManagers.get(project.projectManager)! + 1);
        } else {
          this.projectManagers.set(project.projectManager, 1);
        }
      }
    });

    // Convert project managers map to array for chart
    this.chartData = Array.from(this.projectManagers.entries()).map(([name, count]) => ({
      name,
      value: count
    }));
  }

  navigateToProjectKPIs(projectName: string) {
    // Assuming you have a list of projects in your component
    const project = this.projects.find(proj => proj.title === projectName);

    if (project) {
        this.router.navigate([`pages/kpis/${project.id}`]);
    } else {
        console.error('Project not found');
    }
}


  goBack(): void {
    this.router.navigate(['pages/nav']); 
  }
  // loadProjects(): void {
  //   this.projectsService.getProjects().subscribe({
  //     next: (projects) => {
  //       const archivedCount = projects.filter(p => p.archived).length;
  //       const activeCount = projects.filter(p => !p.archived).length;

  //       this.pieChartOptions = {
  //         title: {
  //           text: 'Projects Status',
  //           left: 'center'
  //         },
  //         tooltip: {
  //           trigger: 'item'
  //         },
  //         legend: {
  //           orient: 'vertical',
  //           left: 'left',
  //         },
  //         series: [
  //           {
  //             name: 'Projects',
  //             type: 'pie',
  //             radius: '50%',
  //             data: [
  //               { value: archivedCount, name: 'Archived' },
  //               { value: activeCount, name: 'Active' }
  //             ],
  //             emphasis: {
  //               itemStyle: {
  //                 shadowBlur: 10,
  //                 shadowOffsetX: 0,
  //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
  //               }
  //             }
  //           }
  //         ]
  //       };
  //     },
  //     error: (error) => {
  //       console.error('Error fetching projects:', error);
  //     }
  //   });
  // }
}
