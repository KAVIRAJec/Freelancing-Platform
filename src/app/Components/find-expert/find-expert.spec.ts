import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindExpert } from './find-expert';

describe('FindExpert', () => {
  let component: FindExpert;
  let fixture: ComponentFixture<FindExpert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindExpert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindExpert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
