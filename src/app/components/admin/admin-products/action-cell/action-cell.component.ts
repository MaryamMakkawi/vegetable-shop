import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SendDataService } from '../send-data.service';

@Component({
  selector: 'app-edit-cell',

  template: `<a [routerLink]="params.data.id" (click)="goEditProduct()">
      <i class="bi bi-pencil-fill"></i
    ></a>
    <a (click)="goDeleteProduct()"> <i class="bi bi-trash-fill"></i></a> `,

  styles: [
    'i{font-size:20px}',
    '.bi-pencil-fill{color:green;margin-right:20px;&:hover{color:lightgreen}}',
    '.bi-trash-fill{color:red;&:hover{color:lightcoral}}',
  ],
})
export class ActionCellComponent implements  ICellRendererAngularComp {
  params!: ICellRendererParams;
  constructor(
    private sendDataService: SendDataService,
    private productService: ProductService,
    private notifierService: NotifierService
  ) {}


  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  goEditProduct() {
    this.sendDataService.sendDataProduct(this.params.data);
  }

  goDeleteProduct() {
    this.productService.delete(this.params.data.id).subscribe({
      next: (value) => {
        this.notifierService.successNotification('success Delete Product.');
        this.params.api.applyTransaction({ remove: [this.params.data] });
      },
      error: (error) => {
        this.notifierService.errorNotification('Error Delete Product.');
      },
    });
  }



}
