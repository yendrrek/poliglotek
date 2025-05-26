import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MenuResponsiveDirective } from './menu-responsive.directive';
import { MatIcon } from '@angular/material/icon';
import { LogoResponsiveDirective } from './logo-responsive.directive';
import { SignInOutComponent } from '../../../auth/sign-in-out.component';

@Component({
  selector: 'navbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatAnchor,
    MenuResponsiveDirective,
    MatIcon,
    MatIconButton,
    LogoResponsiveDirective,
    SignInOutComponent
  ],
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../../shared-styles.scss']
})
export class NavbarComponent {

  @Output() openNav: EventEmitter<void> = new EventEmitter<void>();

  openSideNavigation(): void {
    this.openNav.emit();
  }
}
