import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePageComponent } from './choice-page.component';

describe('ChoicePageComponent', () => {
  let component: ChoicePageComponent;
  let fixture: ComponentFixture<ChoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
