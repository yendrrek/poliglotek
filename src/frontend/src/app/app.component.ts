import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MenuResponsiveDirective } from '../directives/menu-responsive.directive';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { AuthComponent } from '../components/auth/auth.component';

@Component({
  selector: 'root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    ReactiveFormsModule,
    MenuResponsiveDirective,
    RouterLink,
    NavbarComponent,
    MatIcon,
    MatIconButton,
    MatListItem,
    AuthComponent
  ],
  template: `
    <mat-sidenav-container menuResponsive="showMenu">
      <mat-sidenav position="end" #drawer mode="over" [opened]="false">
        <div menuResponsive="showMenu" class="close-icon"> <!--for small screens-->
          <button mat-icon-button (click)="closeSideNavigation()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/home"
             aria-label="Link do strony głównej" (click)="closeSideNavigation()">Strona główna
          </a>
          <a mat-list-item routerLink="/oAplikacji"
             aria-label="Link do strony z informacją na temat aplikacji" (click)="closeSideNavigation()">O aplikacji
          </a>
          <a mat-list-item routerLink="/kontakt"
             aria-label="Link do strony z danymi kontaktowymi autorów aplikacji" (click)="closeSideNavigation()">Kontakt
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <navbar (openNav)="openSideNavigation()"></navbar>
        <router-outlet></router-outlet>
        <google-signin></google-signin>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  openSideNavigation(): void {
    this.drawer.open();
  }

  closeSideNavigation(): void {
    this.drawer.close();
  }
}
