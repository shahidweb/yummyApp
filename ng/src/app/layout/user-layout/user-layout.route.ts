import { Routes } from '@angular/router';
import { UserLayout } from './user-layout';

export const USER_LAYOUT_ROUTE: Routes = [
    {
        path: '',
        component: UserLayout,
        children: [
            { path: '', loadChildren: () => import('../../features/user/home/home.route').then((r => r.HOME_ROUTES)) },
            { path: 'cart', loadChildren: () => import('../../features/user/cart/cart.route').then(r => r.CART_ROUTE) }
        ]
    }
];