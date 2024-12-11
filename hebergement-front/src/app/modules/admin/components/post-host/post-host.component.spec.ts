import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHostComponent } from './post-host.component';

describe('PostHostComponent', () => {
  let component: PostHostComponent;
  let fixture: ComponentFixture<PostHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
