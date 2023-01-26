import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: '', component: AdminProductsComponent },
  {
    path: 'new',
    component: ProductFormComponent,
  },
  {
    path: ':id',
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductsRoutingModule {}
