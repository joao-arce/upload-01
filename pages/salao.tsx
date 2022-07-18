import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { listTodayOrders } from '../libs/order';
import { IOrder } from '../types/order';
import { Spinner } from '../src/components/Spinner';
import Fechamento from './fechamento';
import { filteredByTicket, separeteOrderByTicket } from '../util/helpers';
import OrderPanel from '../src/components/OrderPanel';
import { ITicket } from '../types/ticket';

const Salao = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder>();
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const [ordersToShow, setOrdersToShow] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFechamento, setShowFechamento] = useState(false);
  const [idComanda, setIdComanda] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const router = useRouter();

  const closeFechamento = () => {
    setShowFechamento(false);
  };

  const handleOrder = (id: number | undefined) => {
    setShowFechamento(true);
    // console.log('handleOrder ', id);
    if (id === undefined) id = 0;
    if (id !== 0) {
      const result = orders.filter((item) => item.id === id);
      if (result.length > 0) {
        setOrder(result[0]);
      }
    }

    setIdComanda(id);
  };

  const showPanel = () => {
    const arrayTemp = tickets.map((ticket) =>
      filteredByTicket(orders, ticket.id)
    );
    return arrayTemp.map((order) => <OrderPanel orders={order} />);
  };

  const listOrder = async () => {
    try {
      setShowSpinner(true);
      const orders = await listTodayOrders();
      if (orders.length > 0) {
        setOrders(orders);
        separateOrders(orders);
      }
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      console.log(error);
    }
  };

  const separateOrders = (orders: IOrder[]) => {
    const arrayTicket = separeteOrderByTicket(orders);
    setTickets(arrayTicket);

    const arrayAux = filteredByTicket(orders, arrayTicket[0].id);

    setOrdersToShow(arrayAux);
  };

  const buildScreen = () => {
    setLoading(false);
    listOrder();
    setLoading(true);
  };

  useEffect(() => {
    buildScreen();
  }, []);

  return showSpinner ? (
    <Spinner />
  ) : !showFechamento ? (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-12 mx-auto">
        <div className="mb-5 w-full sm:w-1/2 ">
          <div className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mb-2 rounded-full">
            000 - Comandas Abertas
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            000 - Comandas Fechadas
          </div>
        </div>

        <>{ordersToShow.length > 0 && showPanel()}</>
      </div>
    </section>
  ) : (
    <Fechamento order={order} closeFechamento={closeFechamento} />
  );
};

export default Salao;
