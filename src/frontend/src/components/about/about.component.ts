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
  template: `
    <div class="about about-section" aboutResponsive>
      <div>
        Poliglotek został stworzony by zabrać Cię w najbardziej egzotyczne zakamrki internetu.
        Nie władasz jeszcze biegle chińskim, jidysz czy keczua? Żaden problem! Nasza aplikacja umożliwi Ci
        poznanie treści obcojęzycznych stron internetowych, tłumacząc je na polski.
      </div>
      <div>Jak to działa?
        <ol>
          <li>Wpisz szukaną frazę po polsku.</li>
          <li>Wybierz język, w którym chcesz danej frazy szukać.</li>
          <li>Wybierz kraj, z którego chcesz otrzymać wyniki stron.</li>
          <li>Kliknij "Szukaj" i poczekaj aż Poliglotek dostarczy Ci przetłumaczone strony.</li>
        </ol>
      </div>
      <div>Kilka uwag:</div>
      <div>Poliglotek jest aktualnie w fazie eksperymentalnej.</div>
      <div>
        Aplikacja tłumaczy na polski tekst stron znalezionych przez wyszukiwarkę Google. Celem jest dostarczenie
        przetłumaczonej treści jak najściślej związanej z wyszukiwanym terminem. Przewidzenie struktury HTML jest jednak
        możliwe tylko w pewnym stopniu, więc większość tłumaczeń nieuchronnie będzie także zawierać fragmenty
        bezużyteczne, jak na przykład elementy menu, polityki prywatności itp.
      </div>
      <div>
        Obecnie jedno wyszukanie dostarcza maksymalnie cztery przetłumaczone strony. Ilość ta może uledz
        zmniejszeniu ze względu na techniczne ogranicznenia, na które niestety nie zawsze będziemy
        mieć wpływ. Prosimy o wyrozumiałość.
      </div>
      <div>
        Bardzo chętnie przyjmiemy wszelkie konstruktywne uwagi. Adres e-mail znajduje się na stronie <a
        routerLink="/kontakt">Kontakt</a>.
      </div>
      <button class="disclaimer-button" mat-button (click)="openDisclaimerDialog()">Zastrzeżenie</button>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  readonly  dialog: MatDialog = inject(MatDialog);

  openDisclaimerDialog() {
    this.dialog.open(DialogDisclaimerComponent);
  }
}
