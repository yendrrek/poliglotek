import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './dialog-notification.component.html',
  styleUrl: './dialog-notification.component.css'
})
export class DialogNotificationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { error: string }) { }
}
