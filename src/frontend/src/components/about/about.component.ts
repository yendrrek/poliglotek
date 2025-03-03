import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogDisclaimerComponent } from '../dialog-disclaimer/dialog-disclaimer.component';
import { AboutResponsiveDirective } from '../../directives/about-responsive.directive';

@Component({
  selector: 'about',
  imports: [
    RouterOutlet,
    MatButton,
    AboutResponsiveDirective,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  readonly  dialog: MatDialog = inject(MatDialog);

  openDisclaimerDialog() {
    this.dialog.open(DialogDisclaimerComponent);
  }
}
