import { Component, OnInit } from '@angular/core';
import { ExplorePhaseService } from '../../Services/explore-phase.service.spec';

@Component({
  selector: 'ngx-phase-explorer',
  templateUrl: './phase-explorer.component.html',
  styleUrls: ['./phase-explorer.component.scss']
})
export class PhaseExplorerComponent implements OnInit{
  explorephases: [];
  selectedExplorePhase: null;
  newExplorerPhase: any = {};
  showphase: boolean = false;

  constructor(private ExplorePhaseService:ExplorePhaseService){}
  
  
  
  
  
  ngOnInit(): void {
    this.getData()
  }
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

  openModal() {
    this.showphase = true;
    this.newExplorerPhase = {};
    this.selectedExplorePhase = null;
  }
  closeModal() {
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

  toggleDetails(preparation) {
    preparation.showDetails = !preparation.showDetails;
  }
}


