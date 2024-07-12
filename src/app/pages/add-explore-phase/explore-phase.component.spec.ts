import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePhaseComponent } from './explore-phase.component';

describe('ExplorePhaseComponent', () => {
  let component: ExplorePhaseComponent;
  let fixture: ComponentFixture<ExplorePhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorePhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
