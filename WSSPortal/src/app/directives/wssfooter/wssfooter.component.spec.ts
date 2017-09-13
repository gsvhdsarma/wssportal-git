import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WssfooterComponent } from './wssfooter.component';

describe('WssfooterComponent', () => {
  let component: WssfooterComponent;
  let fixture: ComponentFixture<WssfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WssfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WssfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
