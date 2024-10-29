import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTab, MatTabGroup, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
