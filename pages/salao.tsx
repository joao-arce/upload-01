import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listTodayOrders } from '../libs/order';
import { IOrder } from '../types/order';
import Fechamento from './fechamento';

enum TypeTicket {
  Interno = '1',
  Externo = '2',
}

const colorOrange =
  'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full';
const colorBlue =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';

const Salao = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder>();
  const [internalOrders, setInternalOrders] = useState<IOrder[]>([]);
  const [externalOrders, setExternalOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFechamento, setShowFechamento] = useState(false);
  const [idComanda, setIdComanda] = useState(0);

  const router = useRouter();

  const closeFechamento = () => {
    setShowFechamento(false);
  };

  const goToPartial = (
    e: React.SyntheticEvent,
    order_number: number,
    id_order: number
  ) => {
    e.preventDefault();

    const orderNumber = order_number;
    const idOrder = id_order;

    router.push({
      pathname: '/parcial',
      query: { number: orderNumber, id_order: idOrder },
    });
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

  const showInternal = () => {
    return internalOrders.map((order) => {
      if (order.status === 'fechada') {
        return (
          <button
            // onClick={() => handleOrder(order.id)}
            onClick={(e) => goToPartial(e, order.number, order.id)}
            key={order.id}
            className={`${colorBlue}`}
          >
            {order.number}
          </button>
        );
      } else {
        return (
          <button
            // onClick={() => handleOrder(order.id)}
            onClick={(e) => goToPartial(e, order.number, order.id)}
            key={order.id}
            className={`${colorOrange}`}
          >
            {order.number}
          </button>
        );
      }
    });
  };

  const showExternal = () => {
    const colorOrange =
      'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full';
    const colorBlue =
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';

    const external = externalOrders.map((order) => {
      if (order.status === 'fechada') {
        return (
          <button
            onClick={() => handleOrder(order.id)}
            key={order.id}
            className={`${colorBlue}`}
          >
            {order.number}
          </button>
        );
      } else {
        return (
          <button
            onClick={() => handleOrder(order.id)}
            key={order.id}
            className={`${colorOrange}`}
          >
            {order.number}
          </button>
        );
      }
    });

    return external;
  };

  const listOrder = async () => {
    try {
      const orders = await listTodayOrders();
      setOrders(orders);
      separateOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const separateOrders = (orders: IOrder[]) => {
    // console.log('separateOrders orders ', orders);
    const internals = orders.filter(
      (order) => order.id_ticket === +TypeTicket.Interno
    );
    const externals = orders.filter(
      (order) => order.id_ticket !== +TypeTicket.Interno
    );
    setInternalOrders(internals);
    setExternalOrders(externals);
  };

  const buildScreen = () => {
    setLoading(false);
    listOrder();
    setLoading(true);
  };

  useEffect(() => {
    buildScreen();
  }, []);

  return !showFechamento ? (
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

        <h1 className="mt-2 text-lg">Salão Interno</h1>

        <div className="bg-teal-200 mt-1 rounded-lg px-4 py-5 flex flex-wrap sm:gap-4 sm:px-6">
          {loading && showInternal()}
        </div>

        <h1 className="mt-2 text-lg">Salão Externo</h1>
        <div className="bg-emerald-200 mt-1 rounded-lg px-4 py-5 flex flex-wrap sm:gap-4 sm:px-6">
          {loading && showExternal()}
        </div>
      </div>
    </section>
  ) : (
    <Fechamento order={order} closeFechamento={closeFechamento} />
  );
};

export default Salao;
