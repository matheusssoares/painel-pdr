import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRollerComponent } from './number-roller.component';

describe('NumberRollerComponent', () => {
  let component: NumberRollerComponent;
  let fixture: ComponentFixture<NumberRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberRollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
