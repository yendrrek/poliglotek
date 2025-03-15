import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MenuResponsiveDirective } from '../directives/menu-responsive.directive';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { environment } from '../environments/environment';

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
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  @ViewChild('drawer') drawer!: MatSidenav;

  ngOnInit(): void {
    this.populateLoginUrl();
  }

  populateLoginUrl(): void {
    const loginUrl: string = environment.loginUrl;
    const googleSignInElement: HTMLElement | null = document.getElementById('g_id_onload');
    if (googleSignInElement) {
      this.renderer.setAttribute(googleSignInElement, 'data-login_uri', loginUrl);
    }
  }

  openSideNavigation(): void {
    this.drawer.open();
  }

  closeSideNavigation(): void {
    this.drawer.close();
  }
}
