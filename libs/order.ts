import { IOrder } from '../types/order';
import { getBrazilianDate } from '../util/helpers';

export const listTodayOrders = async () => {
  const dateParam = getBrazilianDate();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/${dateParam}`
  );

  const emptyOrder: IOrder[] = [];
  if (response.ok) {
    const list = await response.json();
    return list.orders;
  } else {
    console.log('Error', response.status);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return emptyOrder;
};

export const createOrder = async (newOrder: IOrder) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newOrder),
    });

    const order = await response.json();
    return order;
  } catch (error) {
    return error;
  }
};

export const getParcial = async (number: number) => {
  const dateParam = getBrazilianDate();

  // order/parcial/:number/:date
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/parcial/${number}/${dateParam}`
  );
  return response;
};
