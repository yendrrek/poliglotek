import { Routes } from '@angular/router';
import { TranslationComponent } from '../containers/translation/translation.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: TranslationComponent },
  // { path: "oAplikacji", component: AboutComponent },
  { path: "kontakt",
    loadComponent: () =>
      import("../containers/contact/contact.component").then((m) => m.ContactComponent),
  },
  // { path: "*", component: NotFoundComponent }
];
