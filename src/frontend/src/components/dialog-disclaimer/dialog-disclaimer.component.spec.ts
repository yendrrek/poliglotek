import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDisclaimerComponent } from './dialog-disclaimer.component';

describe('DisclaimerDialogComponent', () => {
  let component: DialogDisclaimerComponent;
  let fixture: ComponentFixture<DialogDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDisclaimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
