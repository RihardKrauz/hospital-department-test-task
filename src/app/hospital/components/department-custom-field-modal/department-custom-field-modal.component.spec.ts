import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCustomFieldModalComponent } from './department-custom-field-modal.component';

describe('DepartmentCustomFieldModalComponent', () => {
  let component: DepartmentCustomFieldModalComponent;
  let fixture: ComponentFixture<DepartmentCustomFieldModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentCustomFieldModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCustomFieldModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
