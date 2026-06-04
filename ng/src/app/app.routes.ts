import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./layout/user-layout/user-layout.route').then((r => r.USER_LAYOUT_ROUTE)) }
];
