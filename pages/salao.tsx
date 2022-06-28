import { useEffect, useState } from 'react';
import { getBrazilianDate } from '../util/helpers';
import Fechamento from './fechamento';

interface IOrder {
  id?: number;
  number: number;
  client_name: string;
  date: string;
  id_ticket: number;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
}

enum TypeTicket {
  Interno = '1',
  Externo = '2',
}

const Salao = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder>();
  const [internalOrders, setInternalOrders] = useState<IOrder[]>([]);
  const [externalOrders, setExternalOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFechamento, setShowFechamento] = useState(false);
  const [idComanda, setIdComanda] = useState(0);

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

  const showInternal = () => {
    const colorOrange =
      'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full';
    const colorBlue =
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';
    return internalOrders.map((order) => {
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
    // let todayDate = new Date().toISOString().slice(0, 10);
    let todayDate = getBrazilianDate();
    // let todayDate = '2022-06-12';

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/${todayDate}`
    );

    if (response.ok) {
      const list = await response.json();
      // console.log('List ', list.orders);
      setOrders(list.orders);
      separateOrders(list.orders);
    } else {
      console.log('Error', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
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
        <div className="mb-5">
          <div className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mb-2 rounded-full">
            000 - Comandas Abertas
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            000 - Comandas Fechadas
          </div>
        </div>
        <div className="flex flex-wrap -m-12">
          <div className="p-12 md:w-1/2 flex flex-col items-start">
            <h2 className="font-bold text-2xl mb-5">Salão interno</h2>

            <div className="h-screen w-full bg-emerald-400 p-6 rounded-xl">
              <div className="container grid grid-cols-[repeat(4,auto)] gap-12 justify-between justify-items-center">
                {loading && showInternal()}
              </div>
            </div>
          </div>

          {/* EXTERNO */}
          <div className="p-12 md:w-1/2 flex flex-col items-start">
            <h2 className="font-bold text-2xl mb-5">Salão externo</h2>

            <div className="h-screen w-full bg-sky-400 p-6 rounded-xl ">
              <div className="container grid grid-cols-[repeat(4,auto)] gap-12 justify-between justify-items-center ">
                {loading && showExternal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Fechamento order={order} closeFechamento={closeFechamento} />
  );
};

export default Salao;
