import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProposal } from './my-proposal';

describe('MyProposal', () => {
  let component: MyProposal;
  let fixture: ComponentFixture<MyProposal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProposal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProposal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
