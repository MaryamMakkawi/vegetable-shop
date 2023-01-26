import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from 'src/app/shared/interfaces/product.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { validatorUrl } from 'src/app/shared/validators/url.validator';
import { SendDataService } from '../send-data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories!: Observable<any>;
  productForm!: FormGroup;
  id!: string;
  product: Product = {
    id: '',
    title: '',
    category: '',
    price: '',
    imageUrl: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private category: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private receiveDataService: SendDataService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.initForm();
    this.categories = this.category.get();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.receiveDataService.receiveDataProduct()) {
      this.product = this.receiveDataService.receiveDataProduct();
    } else {
      this.productService.get(this.id).subscribe((data: any) => {
        this.product.category = data.category;
        this.product.id = this.id;
        this.product.imageUrl = data.imageUrl;
        this.product.price = data.price;
        this.product.title = data.title;
      });
    }
  }

  // TODO massage tooltip for error invalid form
  initForm() {
    this.productForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, validatorUrl]],
    });
  }

  addNewProduct() {
    this.productService.add(this.productForm.value).subscribe({
      next: (value) => {
        this.router.navigate(['/admin/products']);
        this.notifierService.successNotification('success added Product.');
      },
      error: (err) => {
        this.notifierService.errorNotification('Error added Product.');
      },
    });
  }

  editProduct(editDataProduct: any) {
    this.productService.update(editDataProduct.id, editDataProduct).subscribe({
      next: (value) => {
        this.router.navigate(['/admin/products']);
        this.notifierService.successNotification('success update Product.');
      },
      error: (err) => {
        this.notifierService.errorNotification('Error update Product.');
      },
    });
  }

  onCancel() {
    this.productForm.reset();
    this.router.navigate(['/admin/products']);
  }
}
