import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraddoreditComponent } from './useraddoredit.component';

describe('UseraddoreditComponent', () => {
  let component: UseraddoreditComponent;
  let fixture: ComponentFixture<UseraddoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraddoreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
