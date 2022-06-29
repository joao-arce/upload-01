import { IItem, INewItem } from '../types/item';

export const listItems = async (id_order: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/item/${id_order}`
  );

  const empty: IItem[] = [];

  if (response.ok) {
    const list = await response.json();
    return list;
  } else {
    console.log('Error', response.status);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return empty;
};

export const saveItems = async (newsItems: INewItem[]) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/item/createAndUpdate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newsItems),
    }
  );
  return response;
};

export const attendItems = async (id_order: number) => {
  const newStatus = {
    status: 'atendido',
  };

  const response = await fetch(
    // item/updateMany
    `${process.env.NEXT_PUBLIC_BASE_URL}/item/updateMany/${id_order}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newStatus),
    }
  );
  return response;
};
