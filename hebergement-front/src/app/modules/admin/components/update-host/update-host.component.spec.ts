import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHostComponent } from './update-host.component';

describe('UpdateHostComponent', () => {
  let component: UpdateHostComponent;
  let fixture: ComponentFixture<UpdateHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
