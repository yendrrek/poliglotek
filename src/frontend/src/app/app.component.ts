import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { ResponsiveDirective } from '../directives/responsive.directive';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatAnchor,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    ReactiveFormsModule,
    ResponsiveDirective,
    RouterLink,
    NavbarComponent,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  openNav(): void {
    this.drawer.open();
  }

  closeNav(): void {
    this.drawer.close();
  }
}
