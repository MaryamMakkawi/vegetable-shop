import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'product',
    loadChildren: () =>
      import('./components/product/product.module').then(
        (m) => m.ProductModule
      ),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./components/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'check-out',
    loadChildren: () =>
      import('./components/check-out/check-out.module').then(
        (m) => m.CheckOutModule
      ),
  },
  {
    path: 'order-success',
    loadChildren: () =>
      import('./components/order-success/order-success.module').then(
        (m) => m.OrderSuccessModule
      ),
  },
  {
    path: 'my-orders',
    loadChildren: () =>
      import('./components/my-orders/my-orders.module').then(
        (m) => m.MyOrdersModule
      ),
  },
  {
    path: 'admin/products',
    loadChildren: () =>
      import('./components/admin/admin-products/admin-products.module').then(
        (m) => m.AdminProductsModule
      ),
      canActivate:[AdminGuard]
  },
  {
    path: 'admin/orders',
    loadChildren: () =>
      import('./components/admin/admin-orders/admin-orders.module').then(
        (m) => m.AdminOrdersModule
      ),
      canActivate:[AdminGuard]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
