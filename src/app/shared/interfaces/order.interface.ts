import { Shipping } from './shipping.interface';

export interface Order {
  id: string;
  datePlaced: any;
  items: any[];
  shipping: Shipping;
}
