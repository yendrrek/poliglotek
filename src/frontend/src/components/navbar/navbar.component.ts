import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'navbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatAnchor,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
