import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOutComponent } from './sign-in-out.component';

describe('GoogleSigninComponent', () => {
  let component: SignInOutComponent;
  let fixture: ComponentFixture<SignInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
