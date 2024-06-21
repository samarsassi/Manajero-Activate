import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDocComponent } from './activate-doc.component';

describe('ActivateDocComponent', () => {
  let component: ActivateDocComponent;
  let fixture: ComponentFixture<ActivateDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
