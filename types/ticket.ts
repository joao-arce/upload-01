import { IOrder } from './order';

export type ITicket = {
  id: number;
  description: string;
  adult_price?: number;
  kid_price?: number;
  initial_date: string;
  final_date?: string;
  orders?: IOrder[];
};
