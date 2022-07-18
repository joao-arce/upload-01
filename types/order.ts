import { IItem } from './item';
import { ITicket } from './ticket';

export type IOrder = {
  id: number;
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  combo_price: number;
  status: string;
  id_ticket: number;
  id_cashier: number;
  ticket?: ITicket;
};

export type ICompletedOrder = {
  id: number;
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
  id_ticket: number;
  items: IItem[];
  ticket: ITicket;
  id_cashier: number;
};
