import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { validatorUrl } from 'src/app/shared/validators/url.validator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories!: Category[];
  subscription!: Subscription;
  productForm!: FormGroup;
  product: Product = {
    id: '',
    title: '',
    imageUrl: '',
    price: '',
    category: '',
  };

  constructor(
    private router: Router,
    private category: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.initForm();
    this.subscription = this.category.get().subscribe((categories: any[]) => {
      this.categories = categories;
    });
  }

  // TODO massage tooltip for error invalid form
  initForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, validatorUrl]],
    });
  }

  addNewProduct() {
    this.productService.add(this.productForm.value);
    this.router.navigate(['/admin/products']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
