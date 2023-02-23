import { Shipping } from './shipping.interface';

export interface Order {
  datePlaced:any;
  items: any[];
  shipping: Shipping;
}
