import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home",
    loadComponent: () =>
      import("../containers/translation/translation.component")
        .then((module) => module.TranslationComponent) },
  { path: "oAplikacji",
    loadComponent: () =>
      import("../components/about/about.component")
        .then((module) => module.AboutComponent)
  },
  { path: "kontakt",
    loadComponent: () =>
      import("../containers/contact/contact.component")
        .then((module) => module.ContactComponent)
  },
  // { path: "*", component: NotFoundComponent }
];
