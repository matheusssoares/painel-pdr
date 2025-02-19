import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleMakerComponent } from './raffle-maker.component';

describe('RaffleMakerComponent', () => {
  let component: RaffleMakerComponent;
  let fixture: ComponentFixture<RaffleMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaffleMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
