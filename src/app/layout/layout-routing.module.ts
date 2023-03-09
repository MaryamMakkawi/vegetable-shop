import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AdminGuard } from '../core/guards/admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../components/home/home.module').then((m) => m.HomeModule),
      },

      {
        path: 'shopping-cart',
        loadChildren: () =>
          import('../components/shopping-cart/shopping-cart.module').then(
            (m) => m.ShoppingCartModule
          ),
      },
      {
        path: 'check-out',
        loadChildren: () =>
          import('../components/check-out/check-out.module').then(
            (m) => m.CheckOutModule
          ),
      },
      {
        path: 'my-orders',
        loadChildren: () =>
          import('../components/order/my-orders/my-orders.module').then(
            (m) => m.MyOrdersModule
          ),
      },

      {
        path: 'order-details/:id',
        loadChildren: () =>
          import('../components/order/order-details/order-details.module').then(
            (m) => m.OrderDetailsModule
          ),
      },

      {
        path: 'admin/products',
        loadChildren: () =>
          import(
            '../components/admin/admin-products/admin-products.module'
          ).then((m) => m.AdminProductsModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/orders',
        loadChildren: () =>
          import('../components/admin/admin-orders/admin-orders.module').then(
            (m) => m.AdminOrdersModule
          ),
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
