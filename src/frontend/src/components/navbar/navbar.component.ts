import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { ResponsiveDirective } from '../../directives/responsive.directive';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'navbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatAnchor,
    ResponsiveDirective,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() openNav: EventEmitter<void> = new EventEmitter<void>();

  openSideNavigation(): void {
    this.openNav.emit();
  }
}
