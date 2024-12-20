import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRecievedComponent } from './message-recieved.component';

describe('MessageRecievedComponent', () => {
  let component: MessageRecievedComponent;
  let fixture: ComponentFixture<MessageRecievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRecievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
