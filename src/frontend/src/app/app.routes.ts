import { Routes } from '@angular/router';
import { TranslationComponent } from '../containers/translation/translation.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: TranslationComponent },
  { path: "oAplikacji",
    loadComponent: () =>
      import("../components/about/about.component").then((module) => module.AboutComponent)
  },
  { path: "kontakt",
    loadComponent: () =>
      import("../containers/contact/contact.component").then((module) => module.ContactComponent)
  },
  // { path: "*", component: NotFoundComponent }
];
