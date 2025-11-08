import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePerfumeComponent } from './create-perfume.component';

describe('CreatePerfumeComponent', () => {
  let component: CreatePerfumeComponent;
  let fixture: ComponentFixture<CreatePerfumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePerfumeComponent]
    });
    fixture = TestBed.createComponent(CreatePerfumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
