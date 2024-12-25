import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogDisclaimerComponent } from '../dialog-disclaimer/dialog-disclaimer.component';

@Component({
  selector: 'about',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatButton
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
