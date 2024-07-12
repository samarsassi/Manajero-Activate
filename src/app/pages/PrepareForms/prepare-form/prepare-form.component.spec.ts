import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareFormComponent } from './prepare-form.component';

describe('PrepareFormComponent', () => {
  let component: PrepareFormComponent;
  let fixture: ComponentFixture<PrepareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
