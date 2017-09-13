import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CylinderDetailComponent } from './cylinderdetail.component';

describe('CylinderdetailComponent', () => {
  let component: CylinderDetailComponent;
  let fixture: ComponentFixture<CylinderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CylinderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CylinderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
