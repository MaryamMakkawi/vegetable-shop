import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { AdminProductsComponent } from './admin-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminProductsComponent, ProductFormComponent],
  imports: [CommonModule, AdminProductsRoutingModule, SharedModule],
})
export class AdminProductsModule {}
