import { Routes } from '@angular/router';
import { HomeComponent } from '../containers/home/home.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  // { path: "oAplikacji", component: AboutComponent },
  { path: "kontakt",
    loadComponent: () =>
      import("../containers/contact/contact.component").then((m) => m.ContactComponent),
  },
  // { path: "*", component: NotFoundComponent }
];
