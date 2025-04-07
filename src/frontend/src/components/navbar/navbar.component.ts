import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MenuResponsiveDirective } from '../../directives/menu-responsive.directive';
import { MatIcon } from '@angular/material/icon';
import { LogoResponsiveDirective } from '../../directives/logo-responsive.directive';
import { SignInOutComponent } from '../signin/sign-in-out.component';

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
  template: `
    <mat-toolbar>
      <a logoResponsive class="logo" routerLink="/home"
         aria-label="Logo aplikacji i link do strony głównej">
        POLiglotek</a>

      <div class="right-menu" menuResponsive="hideMenu"> <!--for big screens-->
        <google-signin></google-signin>
        <a class="right-menu-item" mat-button routerLink="/home" aria-label="Link do strony głównej">Strona główna</a>
        <a class="right-menu-item" mat-button routerLink="/oAplikacji"
           aria-label="Link do strony z informacją na temat aplikacji">O aplikacji
        </a>
        <a class="right-menu-item right-menu-item--edge" mat-button routerLink="/kontakt"
           aria-label="Link do strony z danymi kontaktowymi autorów aplikacji">Kontakt
        </a>
      </div>

      <div class="hamburger" menuResponsive="showMenu"> <!--for small screens-->
        <button mat-icon-button (click)="openSideNavigation()">
          <mat-icon>menu</mat-icon>
        </button>
      </div>
    </mat-toolbar>

  `,
  styleUrls: ['./navbar.component.scss', '../../shared-styles/shared-styles.scss']
})
export class NavbarComponent {

  @Output() openNav: EventEmitter<void> = new EventEmitter<void>();

  openSideNavigation(): void {
    this.openNav.emit();
  }
}
