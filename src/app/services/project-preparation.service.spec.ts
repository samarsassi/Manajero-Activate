import { TestBed } from '@angular/core/testing';

import { ProjectPreparationService } from './project-preparation.service';

describe('ProjectPreparationService', () => {
  let service: ProjectPreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
