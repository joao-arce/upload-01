import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import { IOrder } from '../../../types/order';

type Props = {
  orders: IOrder[];
};

const FECHADA = 'fechada';

const OrderPanel = ({ orders }: Props) => {
  const ClosePanel = tw.button`
  bg-blue-500 
  hover:bg-blue-700
  text-white 
  text-sm 
  font-medium 
  mr-2 
  p-3 
  rounded-full
  `;

  const OpenPanel = tw.button`
  bg-orange-500 
  hover:bg-orange-700
  text-white 
  text-sm 
  font-medium 
  mr-2 
  p-3 
  rounded-full
  `;

  const router = useRouter();

  const goToPartial = (
    e: React.SyntheticEvent,
    order_number: number,
    id_order: number
  ) => {
    e.preventDefault();

    const orderNumber = order_number;
    const idOrder = id_order;

    // console.log('goToParcial ');

    router.push({
      pathname: '/parcial',
      query: { number: orderNumber, id_order: idOrder },
    });
  };

  const title = orders[0].ticket?.description as string;
  // const title = '';
  // console.log('Nâo sei se chegou ');
  // console.log(orders);

  return (
    <div className="w-9/12">
      <h1 className="mt-2 text-lg">{title}</h1>

      <div
        className="p-6 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex flex-wrap"
        role="alert"
      >
        {orders.map((order) => {
          if (order.status === FECHADA) {
            return (
              <ClosePanel
                onClick={(e: React.SyntheticEvent) =>
                  goToPartial(e, order.number, order.id)
                }
                key={order.id}
              >
                {order.number}
              </ClosePanel>
            );
          } else {
            return (
              <OpenPanel
                onClick={(e: React.SyntheticEvent) =>
                  goToPartial(e, order.number, order.id)
                }
                key={order.id}
              >
                {order.number}
              </OpenPanel>
            );
          }
        })}
      </div>
    </div>
  );
};

export default OrderPanel;
