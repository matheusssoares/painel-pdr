import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRafflesComponent } from './form-raffles.component';

describe('FormRafflesComponent', () => {
  let component: FormRafflesComponent;
  let fixture: ComponentFixture<FormRafflesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRafflesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRafflesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
