export type ICashier = {
  id?: number;
  open_date: string;
  open_time: string;
  close_date?: string;
  close_time?: string;
  order_sum?: number;
  cash_desk_value?: number;
  description?: string;
  id_user_open: number;
  id_user_close?: number;
};
