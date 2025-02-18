import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MenuResponsiveDirective } from '../directives/menu-responsive.directive';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';

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
    MatListItem
  ],
  templateUrl: './app.component.html',
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
