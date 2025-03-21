import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  imports: [],
  template: `
    <div class="not-found">Wybrana strona nie istnieje, idź do <a href="/home">Strony głównej</a></div>
  `,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
