import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslationDialogMessage } from '../../../../application/translation/translation-dialog-message';

@Component({
  selector: 'dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  template: `
    <mat-dialog-content class="dialog" [innerHTML]="data.message"></mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Zamknij</button>
    </mat-dialog-actions>
  `,
  styleUrl: './dialog-notification.component.scss'
})
export class DialogNotificationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TranslationDialogMessage) { }
}
