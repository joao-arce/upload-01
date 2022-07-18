import { ITicket } from '../types/ticket';

export const createTicket = async (newTicket: ITicket) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newTicket),
    });

    const ticket = await response.json();
    return ticket;
  } catch (error) {
    return error;
  }
};

export const getAllTickets = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ticket`);

    const lstTicket: ITicket[] = [];
    if (response.ok) {
      const list = await response.json();
      return list.tickets;
    } else {
      console.log('Error', response.status);
      return lstTicket;
    }
  } catch (error) {
    return error;
  }
};
