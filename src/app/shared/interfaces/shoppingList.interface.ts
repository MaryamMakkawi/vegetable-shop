import { Product } from './product.interface';

export interface shoppingList {
  createdDate: Date;
  id: string;
  items: Product[];
  quantity: number;
}
