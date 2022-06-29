import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getParcial } from '../libs/order';
import { ICompletedOrder } from '../types/order';

type Product = {
  name: string;
  price: number;
};

type Item = {
  quantity: number;
  product_name: string;
  product_price: number;
  total_item?: number;
};

type OrderData = {
  number: number;
  adult_qtd: number;
  kid_qtd: number;
  adult_price: number;
  kid_price: number;
  total_ticket: number;
};

const Parcial = () => {
  const [showParcial, setShowParcial] = useState(false);
  const [order, setOrder] = useState<OrderData>();
  const [items, setItems] = useState<Item[]>([]);

  let totalConsumo = 0;

  const router = useRouter();

  const buildPartialScreen = (order: ICompletedOrder) => {
    buildPartialOrder(order);
    builPartialConsumo(order);
  };

  const buildPartialOrder = (order: ICompletedOrder) => {
    const { number, adult_qtd, kid_qtd } = order;
    const { adult_price, kid_price } = order.ticket;

    const adult_price_aux = adult_price === undefined ? 0 : adult_price;
    const kid_price_aux = kid_price === undefined ? 0 : kid_price;

    const total = +adult_qtd * +adult_price_aux + +kid_price_aux * +kid_qtd;

    const objOrder: OrderData = {
      number: number,
      adult_qtd: adult_qtd,
      kid_qtd: kid_qtd,
      adult_price: adult_price_aux,
      kid_price: kid_price_aux,
      total_ticket: total,
    };
    setOrder(objOrder);
  };

  const builPartialConsumo = (order: ICompletedOrder) => {
    const { items } = order;

    const result = items.map((item) => {
      const objItem: Item = {
        quantity: item.quantity,
        product_name: item.product.name,
        product_price: item.product.price,
      };
      return objItem;
    });
    setItems(result);
  };

  const getOrder = () => {
    const { number } = router.query;
    const auxNumber = number === undefined ? 0 : +number;

    // console.log('auxNumber ', auxNumber);
    return auxNumber;
  };

  const loadParcial = async () => {
    const auxNumber = getOrder();

    const response = await getParcial(auxNumber);
    const list = await response.json();

    const auxOrder: ICompletedOrder = list.order;

    // console.log('PARCIAL ', auxOrder);

    buildPartialScreen(auxOrder);
  };

  const handleFecharComanda = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { id_order } = router.query;

    const id = id_order;
    const newStatus = {
      status: 'fechada',
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(newStatus),
      }
    );

    if (response.ok) {
      const order = await response.json();
      // console.log('tudo ok');
      // props.closeFechamento();
      router.push('/');
    } else {
      console.log('Erro ', await response.json());
    }
  };

  useEffect(() => {
    loadParcial();
    setShowParcial(true);
  }, []);

  return (
    // <div className="flex h-screen w-full justify-center items-center">
    <div>
      <div className="min-h-[70%] h-screen w-2/3 bg-white flex flex-col items-center  py-5 px-4 rounded-xl shadow-lg">
        {/* Cabeçalho  */}

        {/* <h1 className="text-center text-2xl text-blue-700 font-bold mb-8 ">
          Creative Festas
        </h1>
         */}
        {/* Usuário logado */}
        <div className="p-2 w-full bg-gray-100 rounded-md mb-3">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Silvio Santos
            </h2>
            <p className="text-gray-500">Garçom</p>
          </div>
        </div>

        {/* Dados da comanda */}
        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Comanda {order?.number}
            </h2>
            <div className="flex justify-between">
              <p className="text-gray-500">Rodízio Adulto {order?.adult_qtd}</p>
              <p className="text-gray-500">
                {order !== undefined
                  ? (order?.adult_price * order?.adult_qtd).toFixed(2)
                  : 0}{' '}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Rodízio Criança {order?.kid_qtd} </p>
              <p className="text-gray-500">
                {order !== undefined
                  ? (order?.kid_price * order?.kid_qtd).toFixed(2)
                  : 0}{' '}
              </p>
            </div>

            <div className="flex justify-end gap-5 text-gray-900 title-font  font-medium">
              <h2 className="">Total R$</h2>
              <h2>{order?.total_ticket?.toFixed(2)}</h2>
            </div>
          </div>
        </div>

        {/* Consumo */}

        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font text-center font-medium">
              Consumo
            </h2>
            {items.map((element, index) => {
              totalConsumo += element.product_price * element.quantity;
              return (
                // <div key={index} className="flex justify-between text-gray-500">
                <div key={element.product_name} className="flex text-gray-500">
                  <p className="basis-2/5">{element.product_name} </p>
                  <p className="basis-1/5">{element.quantity} </p>
                  <p className="basis-1/5">
                    {element.product_price.toFixed(2)}{' '}
                  </p>

                  <p className="basis-1/5 text-right">
                    {(element.product_price * element.quantity).toFixed(2)}{' '}
                  </p>
                </div>
              );
            })}
            <div className="flex justify-end gap-5 text-gray-900 title-font  font-medium">
              <h2 className="">Total R$</h2>
              <h2>{totalConsumo.toFixed(2)}</h2>
            </div>
          </div>
        </div>

        {/* Total Geral da conta */}
        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div className="flex justify-end gap-5 text-gray-900 title-font font-medium">
            <h2 className="">Total Geral R$</h2>
            <h2>
              {(
                totalConsumo + (order !== undefined ? order?.total_ticket : 0)
              ).toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Bottons */}
        <div className="w-full flex justify-center gap-14 pt-5 ">
          <button
            // onClick={handleRetornar}
            onClick={(e) => router.back()}
            className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
          >
            Retornar
          </button>

          <button
            onClick={handleFecharComanda}
            className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
          >
            Fechar a conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parcial;
