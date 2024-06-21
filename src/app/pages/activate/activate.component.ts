import { Component } from '@angular/core';

@Component({
  selector: 'ngx-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent {
  
  selectedPhase: string | null = null;

  selectPhase(phase: string) {
    this.selectedPhase = phase;
  }


}
