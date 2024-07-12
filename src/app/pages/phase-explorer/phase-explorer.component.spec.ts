import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseExplorerComponent } from './phase-explorer.component';

describe('PhaseExplorerComponent', () => {
  let component: PhaseExplorerComponent;
  let fixture: ComponentFixture<PhaseExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseExplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
