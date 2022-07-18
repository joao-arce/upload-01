import { ICashier } from '../types/cashier';
import { getBrazilianDate } from '../util/helpers';

// cashier/:date
export const getCashierByDate = async () => {
  const dateParam = getBrazilianDate();

  // console.log('dateParam ', dateParam);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cashier/${dateParam}`
  );

  const empty: ICashier[] = [];

  if (response.ok) {
    const list = await response.json();
    return list;
  } else {
    console.log('Error', response.status);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return empty;
};

export const close = async (data: ICashier) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cashier/close`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      }
    );

    const cashier = await response.json();
    return cashier;
  } catch (error) {
    return await error;
  }
};

export const open = async (data: ICashier) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cashier`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      }
    );
    const cashier = response.json();
    return cashier;
  } catch (error) {
    return await error;
  }
};
