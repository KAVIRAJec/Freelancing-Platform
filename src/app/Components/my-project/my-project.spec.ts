import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProject } from './my-project';

describe('MyProject', () => {
  let component: MyProject;
  let fixture: ComponentFixture<MyProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
