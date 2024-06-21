import { Component } from '@angular/core';


@Component({
  selector: 'ngx-activate-doc',
  templateUrl: './activate-doc.component.html',
  styleUrls: ['./activate-doc.component.scss']

})
export class ActivateDocComponent {
  selectedPhase: string | null = null;

  selectPhase(phase: string) {
    this.selectedPhase = phase;
  }


}
