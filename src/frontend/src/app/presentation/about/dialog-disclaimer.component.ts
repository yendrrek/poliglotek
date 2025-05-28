import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'disclaimer-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: 'dialog-disclaimer.component.html',
  styleUrl: './dialog-disclaimer.component.scss'
})
export class DialogDisclaimerComponent {}
