import { Routes } from '@angular/router';
import { NotFoundComponent } from './presentation/not-found/not-found.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home",
    loadComponent: () =>
      import("./presentation/translation/translation.component")
        .then((module) => module.TranslationComponent) },
  { path: "oAplikacji",
    loadComponent: () =>
      import("./presentation/about/about.component")
        .then((module) => module.AboutComponent)
  },
  { path: "kontakt",
    loadComponent: () =>
      import("./presentation/contact/contact.component")
        .then((module) => module.ContactComponent)
  },
  { path: "**", pathMatch: "full", component: NotFoundComponent }
];
