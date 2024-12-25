import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotificationComponent } from './dialog-notification.component';

describe('DialogComponent', () => {
  let component: DialogNotificationComponent;
  let fixture: ComponentFixture<DialogNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
