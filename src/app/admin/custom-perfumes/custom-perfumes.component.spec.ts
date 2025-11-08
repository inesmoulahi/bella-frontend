import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPerfumesComponent } from './custom-perfumes.component';

describe('CustomPerfumesComponent', () => {
  let component: CustomPerfumesComponent;
  let fixture: ComponentFixture<CustomPerfumesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPerfumesComponent]
    });
    fixture = TestBed.createComponent(CustomPerfumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
