import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTileComponent } from './department-tile.component';

describe('DepartmentTileComponent', () => {
  let component: DepartmentTileComponent;
  let fixture: ComponentFixture<DepartmentTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
