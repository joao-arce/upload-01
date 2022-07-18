import { utcToZonedTime, format } from 'date-fns-tz';
import { IOrder } from '../types/order';
import { ITicket } from '../types/ticket';

export const getBrazilianDate = () => {
  // Obtain a Date instance that will render the equivalent
  // São Paulo time for the UTC date
  const date = new Date();
  const timeZone = 'America/Sao_Paulo';
  const zonedDate = utcToZonedTime(date, timeZone);
  // zonedDate could be used to initialize a
  // date picker or display the formatted local date/time

  // Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
  const pattern = 'yyyy-MM-dd';
  return format(zonedDate, pattern);
};

export const formateDateToSend = (date: string) => {
  const [day, month, year] = date.split('-');

  const result = [year, month, day].join('-');
  return result;
};

export const formateDateToShow = (date: string) => {
  const [year, month, day] = date.split('-');

  const result = [day, month, year].join('-');
  return result;
};

type TypeTicket = {
  id: number;
  description: string;
};
export const separeteOrderByTicket = (orders: IOrder[]) => {
  // const arrayTicket: TypeTicket[] = [];
  const arrayTicket: ITicket[] = [];

  let idAux = 0;
  orders.forEach((order) => {
    if (order.id_ticket !== idAux) {
      arrayTicket.push({
        id: order.id_ticket,
        description: order.ticket?.description as string,
        initial_date: '',
      });
      idAux = order.id_ticket;
    }
  });

  return arrayTicket;
};

export const filteredByTicket = (orders: IOrder[], id_ticket: number) => {
  const result = orders.filter((order) => order.id_ticket === id_ticket);
  // console.log('Filtered');
  // console.log(result);
  return result;
};
