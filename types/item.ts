import { IProduct } from './product';

export type IItem = {
  id?: number;
  service_time: string;
  quantity: number;
  id_user: number;
  id_order: number;
  id_product: number;
  status: string;
  product: IProduct;
};

export type INewItem = {
  id_order: number;
  id_product: number;
  id_user: number;
  service_time: string;
  quantity: number;
  status: string;
};
