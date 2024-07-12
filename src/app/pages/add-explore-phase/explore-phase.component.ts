import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-explore-phase',
  templateUrl: './explore-phase.component.html',
  styleUrls: ['./explore-phase.component.scss']
})
export class ExplorePhaseComponent {
[x: string]: any;
finalizedBusinessProcesses: any;
formData = {
  finalizedBusinessProcesses: '',
  keyDeliverables: '',
  migrationModels: '',
  standardProcessExecution: '',
  additionalObjects: '',
  configurationValues: '',
  scenarioValidation: ''
};

formSubmitted = false;

onSubmit(form: NgForm) {
  this.formSubmitted = true;
  if (form.valid) {
    // Handle form submission logic here
    console.log('Form submitted successfully!', this.formData);
    // You can also reset the form after successful submission
    // form.resetForm();
  } else {
    // Form is invalid, do not submit
    console.log('Form submission failed. Please check errors.');
  }
}

handleFileInput(event: any) {
  const file = event.target.files[0];
  // Handle file selection logic if needed
}

}
